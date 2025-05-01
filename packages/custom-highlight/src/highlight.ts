export const setHighlight = (customHighlightName: string, range: Range) => {
	const instance = CSS.highlights.get(customHighlightName);

	if (!instance) {
		CSS.highlights.set(customHighlightName, new Highlight(range));
	}
	else {
		instance.add(range);
	}
};

export const removeHighlights = (customHighlightName: string, ranges: Range[] | Generator<Range, void, unknown>) => {
	const instance = CSS.highlights.get(customHighlightName);

	if (instance) {
		for (const range of ranges) {
			if (instance.size === 0) {
				break;
			}

			instance.delete(range);
		}

		if (instance.size === 0) {
			CSS.highlights.delete(customHighlightName);
		}
	}
};
