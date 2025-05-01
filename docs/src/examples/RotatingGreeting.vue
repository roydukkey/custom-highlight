<script lang="ts" setup>
import { rand, useIntervalFn } from '@vueuse/core';
import { ref } from 'vue';

const interval = 1000 * 2;
const greetings = ['Hello', 'Hi', 'Yo!', 'Hey', 'Hola', 'Bonjour', 'Salute!'];
const greeting = ref<string | undefined>('Hello');

useIntervalFn(() => {
  greeting.value = greetings[rand(0, greetings.length - 1)];
}, interval);
</script>

<template>
  {{ greeting }} <slot></slot>
</template>
