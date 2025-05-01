# Vue Directive Recipe

`custom-highlight` was developed primarily for use within Vue, so it’s usage there couldn’t simpler. Just import the directive and add it to any element.

<<< ../examples/VueRecipe.vue#snippet

<preview-container>
  <VueRecipe />
</preview-container>

> [!NOTE]
> In the `<script setup>`, any camelCase variable that starts with the `v` prefix can be used as a custom directive. In the example above, `vHighlight` can be used in the template as `v-highlight`.

<script setup>
import VueRecipe from '../examples/VueRecipe.vue';
</script>
