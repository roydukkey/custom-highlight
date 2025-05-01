import type { Search } from '../main.js';

export const normalize = (search: NonNullable<Search>) => typeof search === 'string' || search instanceof RegExp ? [search] : search;

export const baseFlags = (isCaseInsensitive?: boolean) => {
	let flags = 'g';

	if (isCaseInsensitive) {
		flags += 'i';
	}

	return flags;
};
