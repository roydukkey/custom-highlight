# Lifecycle Hooks

This library maintains symmetry with Vue’s [Custom Directive](https://vuejs.org/guide/reusability/custom-directives.html#directive-hooks) API but **does not depend on Vue**. These hooks receive the element on which they should be bound and details of the search.

All [Features](/features/basic-search) will be documented with examples written in Vue, but the these hooks should be robust enough to use in any other framework or context.

## Hooks

The default export of this package provides an object defining the following hooks:

`created(element, binding)`
: called before element's attributes are bound or event listeners are applied.

`beforeMount(element, binding)`
: called right before the element is inserted into the DOM.

`mounted(element, binding)`
: called after element is mounted within its parent and all its children are mounted.

`beforeUpdate(element, updateBinding)`
: called before the element is updated.

`updated(element, updateBinding)`
: called after the element and all of its children have updated.

`unmounted(element, binding)`
: called after the element is unmounted.

## Arguments

These are arguments are passed to each hooks:

`element`
: the [`HTMLElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement) in which to search for tokens and patterns to highlight

`binding`
: an object containing details of the search

  `value`
  : the tokens or patterns for which to search

  `arg` *(optional)*
  : the name of the custom highlight to target for styling by the [`::highlight()`](https://developer.mozilla.org/en-US/docs/Web/CSS/::highlight) CSS pseudo-element.

  `modifiers` *(optional)*
  : an object of configuration enabling specific behavior

    `i`
    : enables case-insensitive searching for tokens and patterns

    `deep`
    : enables a [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) to deeply monitor change to character data.

`updateBinding`
: an object containing all the same options as `binding` and others

  `oldValue`
  : the tokens or patterns of the existing search to be removed.
