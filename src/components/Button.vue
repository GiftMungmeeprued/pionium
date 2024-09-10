<script setup>
import { colors, store } from "./store";
const props = defineProps({
  mainTitle: {
    type: String,
    default: "",
  },
  color: {
    type: String,
    default: "white",
  },
});
</script>
<template>
  <button
    tabindex="-1"
    type="button"
    :title="mainTitle"
    :class="`button font-semibold border-0 border-gray-400 rounded shadow text-center w-full tall:h-12 text-[100%] tall:text-3xl min-h-7 grow select-none ${
      colors[props.color]
    }`"
    :disabled="store.onSto"
  >
    <slot></slot>
  </button>
</template>
<style scoped src="../assets/button.css"></style>
