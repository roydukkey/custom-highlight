import { mapGetSafe } from './utils/map.js';
import { prepare } from './prepare.js';
import { search } from './search.js';
import { searchRemove } from './remove.js';
import { createDeepObserver } from './deep.js';
import type { DirectiveConfig } from './store.js';
import type { Binding, CustomHighlight } from './main.js';

export const defaultCustomHighlightName = 'default';
export const instances: WeakMap<HTMLElement, DirectiveConfig> = new WeakMap();

const mounted = (element: HTMLElement, binding: Binding, warn?: boolean) => {
	// The `created` hook guarantees an instance.
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const config = instances.get(element)!;

	if (!--config.cursor && config.deep) {
		config.stop ??= createDeepObserver(config, element);
	}

	if (binding.value) {
		const needleStore = mapGetSafe(config.store, binding.arg ?? defaultCustomHighlightName, () => new Map());
		const needles = prepare(needleStore, binding.value, binding.modifiers?.i, warn);

		search(needleStore, element, binding.arg, needles);
	}

	return directive;
};

export const directive: CustomHighlight = {

	created(element, binding) {
		const config = mapGetSafe(instances, element, () => ({ store: new Map(), cursor: 0, deep: false }));

		if (binding.modifiers?.deep) {
			config.deep = true;
		}

		return directive;
	},

	beforeMount(element) {
		// The `created` hook guarantees an instance.
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const instance = instances.get(element)!;

		instance.cursor++;
		instance.stop?.();

		return directive;
	},

	mounted: (element, binding) => mounted(element, binding, true),
	beforeUpdate: (...args) => directive.beforeMount(...args),

	updated(element, binding) {
		if (binding.oldValue) {
			// The `created` hook guarantees an instance.
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			const needleStore = instances.get(element)!.store.get(binding.arg ?? defaultCustomHighlightName)!;

			searchRemove(needleStore, binding.oldValue, binding.modifiers?.i, binding.arg);
		}

		return mounted(element, binding);
	},

	unmounted(element, binding) {
		const instance = instances.get(element);

		if (instance) {
			if (binding.value) {
				const name = binding.arg ?? defaultCustomHighlightName;

				// The `created` hook guarantees an instance.
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				const needleStore = instance.store.get(name)!;

				searchRemove(needleStore, binding.value, binding.modifiers?.i, binding.arg);

				if (!needleStore.size) {
					instance.store.delete(name);
				}
			}

			if (!instance.store.size) {
				instance.stop?.();
				instances.delete(element);
			}
		}

		return directive;
	},

};
