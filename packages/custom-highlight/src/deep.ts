import { search } from './search.js';
import { clearMutatedRanges } from './remove.js';
import type { DirectiveConfig } from './store.js';

export const createDeepObserver = (config: DirectiveConfig, element: HTMLElement) => {
	const observer = new MutationObserver((mutations) => {
		config.store.forEach((needleStore, customHighlightNameByArg) => {
			clearMutatedRanges(needleStore);

			mutations.forEach((mutation) => {
				search(needleStore, mutation.target, customHighlightNameByArg, needleStore.keys());
			});
		});
	});

	observer.observe(element, {
		characterData: true,
		childList: true,
		subtree: true,
	});

	return () => {
		delete config.stop;
		observer.disconnect();
	};
};
