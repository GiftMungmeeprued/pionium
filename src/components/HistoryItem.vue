<script setup>
import { onMounted, ref } from "vue";

const props = defineProps({
  item: {
    type: Object,
    default: {},
  },
});
const inputEl = ref(null);
const answerEl = ref(null);

onMounted(() => {
  const MQ = MathQuill.getInterface(2);
  MQ.StaticMath(inputEl.value).latex(props.item.input);
  MQ.StaticMath(answerEl.value).latex(props.item.answer);
});
</script>
<template>
  <div
    class="pt-5 pb-3 px-5 border-solid border-b border-0 border-neutral-300 hover:bg-neutral-100"
  >
    <div class="h-8 w-full" ref="inputEl"></div>
    <div class="h-8 w-full text-right" ref="answerEl"></div>
  </div>
</template>
