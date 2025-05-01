import { computed, isRef, unref } from 'vue';
import { useFetch } from '@vueuse/core';
import type { MaybeRef } from 'vue';

const endpoint = 'https://api.webstatus.dev/v1/features/';

export const useWebStatus = (featureId: MaybeRef<string>) => {
	const url = computed(() => `${endpoint}${unref(featureId)}`);
	const { data } = useFetch(url, {
		refetch: isRef(featureId),
		beforeFetch: ({ options }) => {
			options.cache = 'force-cache';

			return { options };
		},
	}).get().json<WebStatus>();

	return computed(() => data.value);
};

interface WebStatus {
	name: string;
	baseline: {
		status: 'limited' | 'newly' | 'widely';
		low_date?: string;
		high_date?: string;
	};
	browser_implementations: {
		[K in BrowserIdentifier]?: {
			version: string;
		};
	};
}

type BrowserIdentifier = 'chrome' | 'chrome_android' | 'edge' | 'firefox' | 'firefox_android' | 'safari' | 'safari_ios';
