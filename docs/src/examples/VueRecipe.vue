<script setup>
import vHighlight from 'custom-highlight';
</script>

<template>
  <p v-highlight="'brown fox'">The quick brown fox jumps over the lazy dog.</p>
</template>

<style>
  ::highlight(default) {
    background-color: yellow;
    color: black;
  }
</style>
