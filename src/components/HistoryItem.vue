<script setup>
import { onMounted, ref } from "vue";
import Simplebar from "simplebar-vue";
import "simplebar-vue/dist/simplebar.min.css";
import { store } from "./store.js";
const props = defineProps({
  item: {
    type: Object,
    default: {},
  },
});
const inputEl = ref(null);
const answerEl = ref(null);

function loadHistory(item) {
  const MQ = MathQuill.getInterface(2);
  const mathField = MQ.MathField(document.getElementById("math-field"));
  mathField.latex(item.input);
  const answerField = MQ.StaticMath(document.getElementById("answer"));
  answerField.latex(item.answer);
  // close the history tab if the history item is clicked for mobile screen
  if (window.innerWidth < 640) {
    store.showSidePane.historySidePane = false;
  }
}

onMounted(() => {
  const MQ = MathQuill.getInterface(2);
  MQ.StaticMath(inputEl.value).latex(props.item.input);
  MQ.StaticMath(answerEl.value).latex(props.item.answer);
});
</script>
<template>
  <div
    class="border-solid border-b border-0 border-neutral-300 dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-[#4a5155] cursor-pointer"
    @click="loadHistory(props.item)"
  >
    <Simplebar class="w-full pt-5 px-5">
      <span class="min-h-8" ref="inputEl"></span>
    </Simplebar>
    <Simplebar class="w-full px-5 pb-3 text-right">
      <span class="min-h-8" ref="answerEl"></span>
    </Simplebar>
  </div>
</template>
