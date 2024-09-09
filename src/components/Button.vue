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
    :class="`button font-semibold border-0 border-gray-400 rounded shadow text-center w-full tall:h-12 tall:text-3xl h-7 text-base select-none ${
      colors[props.color]
    }`"
    :disabled="store.onSto"
  >
    <slot></slot>
  </button>
</template>
<style scoped src="../assets/button.css"></style>
