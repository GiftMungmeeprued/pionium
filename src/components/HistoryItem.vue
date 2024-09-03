<script setup>
import { onMounted, ref } from "vue";
import Simplebar from "simplebar-vue";
import "simplebar-vue/dist/simplebar.min.css";

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
    class="border-solid border-b border-0 border-neutral-300 hover:bg-neutral-100"
  >
    <Simplebar class="w-full pt-5 px-5">
      <span class="h-8" ref="inputEl"></span>
    </Simplebar>
    <Simplebar class="w-full px-5 pb-3 text-right">
      <span class="h-8" ref="answerEl"></span>
    </Simplebar>
  </div>
</template>
