<script setup>
import { ref, onMounted, watch } from "vue";
import { store } from "./store";

const props = defineProps({
  variable: {
    type: String,
    default: "",
  },
});

const variableEl = ref(null);
const valueEl = ref(null);

function displayValue(variable) {
  const value = store.variables[variable];
  if (value == undefined) {
    return "\\text{undefined}";
  } else {
    return value;
  }
}

function displayVariable(variable) {
  return `\\text{${variable}}`;
}

const MQ = MathQuill.getInterface(2);

onMounted(() => {
  MQ.StaticMath(variableEl.value).latex(displayVariable(props.variable));
  MQ.StaticMath(valueEl.value).latex(displayValue(props.variable));
});

watch(
  () => store.variables,
  () => {
    MQ.StaticMath(variableEl.value).latex(displayVariable(props.variable));
    MQ.StaticMath(valueEl.value).latex(displayValue(props.variable));
  }
);
</script>

<template>
  <tr
    scope="row"
    class="odd:bg-red even:bg-gray-50 border-solid border-b border-0 border-neutral-300"
  >
    <th class="p-3 text-normal">
      <span ref="variableEl"></span>
    </th>
    <td class="p-3">
      <span ref="valueEl"></span>
    </td>
  </tr>
</template>
