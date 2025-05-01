# Get Started

The `custom-highlight` library is a set of lifecycle hooks for highlighting words or even larger phrases within a body of text.

Under the hood, it uses the native [CSS Custom Highlight API](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Custom_Highlight_API) as a mechanism for styling text ranges, all without making any alterations to the DOM structure.

<baseline-status featureId="highlight" mdnCompatibilityHref="https://developer.mozilla.org/en-US/docs/Web/API/Highlight#browser_compatibility" />

## Installation

::: code-group
```sh [npm]
npm install custom-highlight
```

```sh [pnpm]
pnpm add custom-highlight
```

```sh [yarn]
yarn add custom-highlight
```

```sh [bun]
bun add custom-highlight
```
:::

## CDN

::: code-group
```html [UNPKG]
<script src="https://unpkg.com/custom-highlight"></script>
```

```html [jsDelivr]
<script src="https://cdn.jsdelivr.net/npm/custom-highlight"></script>
```
:::

It will be exposed globally as `window.CustomHighlight`.

## Usage

Here is a very basic example that will highlight the words “brown fox” in the paragraph.

<<< ./examples/GettingStarted.html#snippet

<preview-container>
  <VueRecipe />
</preview-container>

This works just fine in a static webpage, but frameworks that dynamically render content by manipulating the DOM (e.g. Vue, React, Svelte, etc.) will require additional effort in conforming to their component lifecycles.

<script setup>
import VueRecipe from './examples/VueRecipe.vue';
</script>
