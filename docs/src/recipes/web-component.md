# Web Component Recipe

Here is a simple example showing how to use `custom-highlight` in a custom element's [lifecycle callbacks](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements#custom_element_lifecycle_callbacks).


::: code-group

<<< ../examples/WebComponentRecipe.ts#snippet [CustomHighlightZone.ts]

```html [index.html]
<script type="module">
  import { CustomHighlightZone } from './CustomHighlightZone.js';
  customElements.define('custom-highlight-zone', CustomHighlightZone);
</script>

<custom-highlight-zone search="brown fox">
  The quick brown fox jumps over the lazy dog.
</custom-highlight-zone>

<style>
  ::highlight(default) {
    background-color: yellow;
    color: black;
  }
</style>
```

:::

<preview-container>
  <ClientOnly>
    <custom-highlight-zone search="brown fox">The quick brown fox jumps over the lazy dog.</custom-highlight-zone>
  </ClientOnly>
</preview-container>
