<script setup>
import vHighlight from 'custom-highlight';
import RotatingGreeting from './RotatingGreeting.vue';
</script>

<!-- #region snippet -->
<template>
  <p v-highlight="/[aeiou]/ig">
    <RotatingGreeting>
      World
    </RotatingGreeting>
  </p>
</template>
<!-- #endregion snippet -->
