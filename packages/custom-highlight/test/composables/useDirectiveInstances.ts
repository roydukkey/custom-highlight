import { computed } from 'vue';
import vHighlight from '../../src/main.js';
import type { Ref } from 'vue';
import type { Writable } from 'type-fest';
import type { Binding, Search } from '../../src/main.js';

export const useDirectiveInstances = (searches: Ref<InstanceConfig[]>) =>
	computed(() => searches.value.map(([search, customHighlightName, modifiers = {}]) => {
		const instance = [vHighlight, search, customHighlightName, modifiers] as const;
		return instance as Writable<typeof instance>;
	}));

export type InstanceConfig = [search: Search, customHighlightName?: string | undefined, modifiers?: Binding['modifiers']];
