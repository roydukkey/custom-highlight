# Highlight Groups

In some cases you might want to style highlights differently from one another. By separating highlights into groups, the `::highlight` selector can be updated to target each group by name.

## Directive Argument

The name of a highlight group can be set by adding an argument to the directive. Vue documentation is not very clear on this, but a [directive argument](https://vuejs.org/guide/reusability/custom-directives.html#hook-arguments) is a postfix to a directive name, separated by a colon (i.e. `v-highlight:${arg}`).

<<< ../examples/GroupDirective.vue#snippet{2}

<preview-container>
  <GroupDirective />
</preview-container>

## Regex Named Groups

The names of highlight groups can also be derived from the names of the [capturing groups](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Named_capturing_group) defined in the search pattern.

<<< ../examples/GroupRegex.vue#snippet{2}

<preview-container>
  <GroupRegex />
</preview-container>

> [!IMPORTANT]
> The directive argument will override all names derived from capturing groups.

<script setup>
import GroupDirective from '../examples/GroupDirective.vue';
import GroupRegex from '../examples/GroupRegex.vue';
</script>
