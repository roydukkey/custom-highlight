# Deep Updates

There are times where the content of a element can change without causing the component instance, on which directives are registered, to update.

The following example illustrates this issue:

<preview-container hide-heading>
  <DeepBroken />
</preview-container>

In such causes, the **`deep` modifier** can be used to deeply track alterations to character data.

::: code-group

<<< ../examples/DeepFixed.vue#snippet{2} [Deep.vue]
<<< ../examples/RotatingGreeting.vue#snippet

:::

<preview-container>
  <DeepFixed />
</preview-container>

<script setup>
import DeepFixed from '../examples/DeepFixed.vue';
import DeepBroken from '../examples/DeepBroken.vue';
</script>
