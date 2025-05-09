# Case-Insensitivity

The **`i`&nbsp;modifier** will enable case-insensitive searching for highlights. Additionally, regular expressions using the **`i`&nbsp;flag** will be respected as case-insensitive. However, the `i`&nbsp;modifier will override regular expressions not using the `i`&nbsp;flag.

See [Advanced Search](./advanced-search.md) for more information on searching by regular expression.

## `i` Modifier

<<< ../examples/CaseModifier.vue#snippet{2}

<preview-container>
  <CaseModifier />
</preview-container>

## Regex `i` Flag

<<< ../examples/CaseRegex.vue#snippet{2}

<preview-container>
  <CaseRegex />
</preview-container>

<script setup>
import CaseModifier from '../examples/CaseModifier.vue';
import CaseRegex from '../examples/CaseRegex.vue';
</script>
