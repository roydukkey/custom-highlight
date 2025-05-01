import { defaultCustomHighlightName } from './directive.js';
import { baseFlags, normalize } from './utils/search.js';
import { extractCaptureGroupNames, toRegex } from './utils/regex.js';
import { removeHighlights } from './highlight.js';
import type { RangeStore, NeedleStore } from './store.js';
import type { Search } from './main.js';

export const searchRemove = (needleStore: NeedleStore, search: NonNullable<Search>, isCaseInsensitive?: boolean, customHighlightNameByArg?: string) => {
	const flags = baseFlags(isCaseInsensitive);

	for (const needle of normalize(search)) {
		if (typeof needle === 'string') {
			if (!needle.length) {
				continue;
			}

			const id = toRegex(needle, flags).toString();
			const rangeStore = needleStore.get(id)?.store;

			if (rangeStore) {
				removeNames(rangeStore, [customHighlightNameByArg ?? defaultCustomHighlightName]);
				needleStore.delete(id);
			}
		}

		else {
			const id = needle.toString() + flags;
			const rangeStore = needleStore.get(id)?.store;

			if (rangeStore) {
				const names = [];

				if (!customHighlightNameByArg) {
					names.push(...extractCaptureGroupNames(needle));
				}

				if (!names.length) {
					names.push(defaultCustomHighlightName);
				}

				removeNames(rangeStore, names);
				needleStore.delete(id);
			}
		}

	};
};

const removeNames = (rangeStore: RangeStore, customHighlightNames: string[]) => {
	customHighlightNames.forEach((customHighlightName) => {
		const ranges = rangeStore.get(customHighlightName);

		if (ranges) {
			removeHighlights(customHighlightName, ranges);
			rangeStore.delete(customHighlightName);
		}
	});
};

export const clearMutatedRanges = (needleStore: NeedleStore) => {
	needleStore.forEach((instance) => {
		instance.store.forEach((ranges, customHighlightName) => {
			removeHighlights(customHighlightName, extractMutatedRanges(ranges));
		});
	});
};

const extractMutatedRanges = function* (ranges: Range[]) {
	for (let index = 0; index < ranges.length; index++) {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const range = ranges[index]!;

		if (range.collapsed) {
			yield range;
			ranges.splice(index, 1);
			index--;
		}
	}
};
