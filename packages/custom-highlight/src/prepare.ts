import { clone, toRegex } from './utils/regex.js';
import { baseFlags, normalize } from './utils/search.js';
import { log } from './utils/log.js';
import type { Search } from './main.js';
import type { NeedleId, NeedleStore } from './store.js';

export const prepare = (needleStore: NeedleStore, search: NonNullable<Search>, isCaseInsensitive?: boolean, warn?: boolean) => {
	const flags = baseFlags(isCaseInsensitive);
	const needles: NeedleId[] = [];

	for (const needle of normalize(search)) {
		let id: NeedleId;
		let regex: RegExp;

		if (typeof needle === 'string') {
			if (!needle.length) {
				continue;
			}

			regex = toRegex(needle, flags);
			id = regex.toString();
		}
		else {
			id = needle.toString() + flags;
			regex = clone(needle, `${flags}d`);
		}

		if (needleStore.has(id)) {
			if (warn) {
				log(`Duplicate search token or pattern ${typeof needle === 'string' ? `'${needle}'` : needle.toString()}.`);
				continue;
			}
		}
		else {
			needleStore.set(id, { store: new Map(), regex });
		}

		needles.push(id);
	}

	return needles;
};
