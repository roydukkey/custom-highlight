import { defaultCustomHighlightName } from './directive.js';
import { defaultValueArray, mapGetSafe } from './utils/map.js';
import { setHighlight } from './highlight.js';
import type { RangeStore, NeedleId, NeedleStore } from './store.js';

export const search = (needleStore: NeedleStore, element: Node, customHighlightNameByArg: string | undefined, needles: NeedleId[] | MapIterator<NeedleId>) => {
	for (const node of walkTree(element)) {
		for (const needle of needles) {
			let match: RegExpExecArray | null;
			// The `created` hook guarantees an instance.
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			const { store, regex } = needleStore.get(needle)!;

			while ((match = regex.exec(node.textContent)) !== null) {
				if (match.groups) {
					for (const [name, value] of Object.entries<string | undefined>(match.groups)) {
						if (value !== undefined) {
							createRange(
								store,
								node,
								customHighlightNameByArg ?? name,
								// indices are forced and guaranteed
								// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
								match.indices!.groups![name]!,
							);
						}
					}
				}

				else {
					createRange(
						store,
						node,
						customHighlightNameByArg ?? defaultCustomHighlightName,
						[match.index, match.index + match[0].length],
					);
				}
			}
		}
	}
};

const walkTree = function* (element: Node) {
	const walker = document.createTreeWalker(element, 4); // 4 = NodeFilter.SHOW_TEXT

	do {
		if (isTextWithContent(walker.currentNode)) {
			yield walker.currentNode;
		}
	} while (walker.nextNode());
};

const isTextWithContent = (node: Node): node is (Text & { textContent: string }) =>
	node instanceof Text && node.textContent !== null;

const createRange = (rangeStore: RangeStore, node: Node, customHighlightName: string, [start, end]: [number, number]) => {
	const ranges = mapGetSafe(rangeStore, customHighlightName, defaultValueArray);
	const range = new Range();

	range.setStart(node, start);
	range.setEnd(node, end);

	ranges.push(range);

	setHighlight(customHighlightName, range);
};
