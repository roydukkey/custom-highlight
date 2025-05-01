# Vue Directive Recipe

Because `custom-highlight` is implemented as a [Custom Directive](https://vuejs.org/guide/reusability/custom-directives.html#directive-hooks), it’s use in Vue couldn’t be easier. Just import the directive and add it to any element.

<<< ../examples/VueRecipe.vue#snippet

<preview-container>
  <VueRecipe />
</preview-container>

> [!NOTE]
> In the `<script setup>`, any camelCase variable that starts with the `v` prefix can be used as a custom directive. In the example above, `vHighlight` can be used in the template as `v-highlight`.

<script setup>
import VueRecipe from '../examples/VueRecipe.vue';
</script>
