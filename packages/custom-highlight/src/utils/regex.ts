import escapeStringRegexp from 'escape-string-regexp';

export const toRegex = (value: string, flags: string) => new RegExp(escapeStringRegexp(value), flags);
export const clone = (regex: RegExp, flags: string) => new RegExp(regex, Array.from(new Set(regex.flags + flags)).join(''));

const captureGroupsRegex = /\(\?<([$_\p{ID_Start}][$\p{ID_Continue}]*)>.+?\)/gu;

export const extractCaptureGroupNames = function* (regex: RegExp) {
	let match: RegExpExecArray | null;

	while ((match = captureGroupsRegex.exec(regex.source)) !== null) {
		if (match[1]) {
			yield match[1];
		}
	}
};
