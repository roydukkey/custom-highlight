import { directive } from './directive.js';

const isClient = typeof window !== 'undefined' && typeof document !== 'undefined';

/**
 * Whether the [CSS Custom Highlight API](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Custom_Highlight_API) is supported in the current context.
 */
export const isSupported = typeof Highlight === 'undefined';

/**
 * A set of lifecycle hooks for styling arbitrary text within elements using the [CSS Custom Highlight API](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Custom_Highlight_API).
 *
 * @remarks
 * These hooks are symmetric to Vue's [Custom Directive](https://vuejs.org/guide/reusability/custom-directives.html#directive-hooks) API but do not depend on Vue itself.
 */
/* v8 ignore next 5 */
export default (
	isSupported && isClient
		// @ts-expect-error this is to noop invocations of lifecycle hooks
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		? new Proxy<typeof directive>({}, { get: () => () => {} })
		: directive
);

export interface CustomHighlight {
	/**
	 * Called before element's attributes are bound or event listeners are applied.
	 *
	 * @param element - the element in which to search for tokens and patterns to highlight
	 * @param binding - an object containing details of the search
	 */
	created: (element: HTMLElement, binding: Binding) => CustomHighlight;
	/**
	 * Called right before the element is inserted into the DOM.
	 *
	 * @param element - the element in which to search for tokens and patterns to highlight
	 * @param binding - an object containing details of the search
	 */
	beforeMount: (element: HTMLElement, binding: Binding) => CustomHighlight;
	/**
	 * Called after element is mounted within its parent and all its children are mounted.
	 *
	 * @param element - the element in which to search for tokens and patterns to highlight
	 * @param binding - an object containing details of the search
	 */
	mounted: (element: HTMLElement, binding: Binding) => CustomHighlight;
	/**
	 * Called before the element is updated.
	 *
	 * @param element - the element in which to search for tokens and patterns to highlight
	 * @param binding - an object containing details of the search
	 */
	beforeUpdate: (element: HTMLElement, binding: UpdateBinding) => CustomHighlight;
	/**
	 * Called after the element and all of its children have updated.
	 *
	 * @param element - the element in which to search for tokens and patterns to highlight
	 * @param binding - an object containing details of the search
	 */
	updated: (element: HTMLElement, binding: UpdateBinding) => CustomHighlight;
	/**
	 * Called after the element is unmounted.
	 *
	 * @param element - the element in which to search for tokens and patterns to highlight
	 * @param binding - an object containing details of the search
	 */
	unmounted: (element: HTMLElement, binding: Binding) => CustomHighlight;
}

export interface Binding {
	/**
	 * The tokens or patterns for which to search.
	 */
	value: Search;
	/**
	 * The name of the custom highlight to target for styling by the [`::highlight()`](https://developer.mozilla.org/en-US/docs/Web/CSS/::highlight) CSS pseudo-element.
	 *
	 * When searching by regular expression, such names will be derived from the [named capturing groups](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Named_capturing_group) defined in the pattern. However, if a lifecycle hook's binding specifies the name, it will override all names from the pattern.
	 *
	 * @defaultValue `'default'`
	 */
	arg?: string;
	/**
	 * Additional configurations to enable specific behavior.
	 */
	modifiers?: {
		/**
		 * Enables case-insensitive searching for tokens and patterns.
		 *
		 * @remarks When searching by regular expression, this option will override the case sensitivity of all patterns in the search.
		 */
		i?: boolean;
		/**
		 * Enables a [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) to deeply monitor changes to character data.
		 */
		deep?: boolean;
	};
}

export interface UpdateBinding extends Binding {
	/**
	 * The tokens or patterns of the existing search to be removed.
	 */
	oldValue: Search;
}

export type Search = Needle | Needle[] | undefined;
type Needle = string | RegExp;
