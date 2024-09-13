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
    class="odd:bg-white even:bg-gray-50 dark:odd:bg-[#313639ff] dark:even:bg-[#3d4142] border-solid border-b border-0 border-neutral-300 dark:border-neutral-600"
  >
    <th class="py-3 text-center text-normal">
      <span ref="variableEl"></span>
    </th>
    <td class="py-3 pl-10">
      <span ref="valueEl"></span>
    </td>
  </tr>
</template>
