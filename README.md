# `custom-highlight`

A set of lifecycle hooks for styling arbitrary text within elements using the [CSS Custom Highlight API](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Custom_Highlight_API).

[![Release Version](https://img.shields.io/npm/v/custom-highlight.svg)](https://www.npmjs.com/package/custom-highlight)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Features

* Highlight **single or multiple tokens** within an element, or patterns using a **regular expression**
* Easily configure **case-insensitive** searching for tokens and pattern
* Define **custom high groups** for target each group with unique styles
* Deeply monitor changes to character data triggering an update to highlights

## Install

```sh
npm install custom-highlight
```

## CDN

```html
<script src="https://unpkg.com/custom-highlight"></script>
<script src="https://cdn.jsdelivr.net/npm/custom-highlight"></script>
```

It will be exposed globally as `window.CustomHighlight`.


## Usage

Here is a very basic example that will highlight the words “brown fox” in the paragraph.

```html
<p id="gettingStarted">The quick brown fox jumps over the lazy dog.</p>

<script type="module">
import CustomHighlight from 'custom-highlight';

const element = document.getElementById('gettingStarted');
const options = { value: 'brown fox' };

if (element) {
  CustomHighlight
    .created(element, options)
    .beforeMount(element, options)
    .mounted(element, options);
}
</script>

<style>
  ::highlight(default) {
    background-color: yellow;
    color: black;
  }
</style>
```

This works just fine in a static webpage, but frameworks that dynamically render content by manipulating the DOM (e.g. Vue, React, Svelte, etc.) will require additional effort in conforming to their component lifecycles.
