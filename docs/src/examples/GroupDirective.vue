<script setup>
import vHighlight from 'custom-highlight';
</script>

<!-- #region snippet -->
<template>
  <div v-highlight:wild="'fox'" v-highlight:domestic="'dog'">
    <p>A swift, russet fox, full of boundless energy, propelled itself upward. With a burst of motion, it cleared a stationary dog below. This agile creature continued its journey without pause.</p>
    <p>Beneath the airborne fox lay the dog, languid, uninterested in the world around it. The sleepy canine remained still, undisturbed by the flurry above. It seemed content in its state of repose.</p>
  </div>
</template>

<style>
  ::highlight(wild) {
    background-color: lightpink;
    color: black;
  }
  ::highlight(domestic) {
    background-color: lightskyblue;
    color: black;
  }
</style>
<!-- #endregion snippet -->
