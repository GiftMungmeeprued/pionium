<script setup>
import { colors, store } from "./store";

const props = defineProps({
  color: {
    type: String,
    default: "white",
  },
  centerTitle: {
    type: String,
    default: "",
  },
  mainTitle: {
    type: String,
    default: "",
  },
  upperSpace: {
    type: Boolean,
    default: true,
  },
  isVariable: {
    type: Boolean,
    default: false,
  },
  onPressed: {
    type: Boolean,
    default: false,
  },
});
</script>
<template>
  <div class="flex flex-col select-none">
    <div
      class="text-center px-1 text-xs tall:text-sm text-[#5F5F5F]"
      :title="centerTitle"
      :class="{ 'h-4 tall:h-5': upperSpace }"
    >
      <slot name="center"></slot>
    </div>
    <button
      type="button"
      :class="`button flex justify-center items-center font-semibold border-0 rounded shadow px-0.5 py-0 h-6 tall:h-8 text-xs tall:text-xl ${
        colors[props.color]
      } ${props.onPressed ? 'onpressed' : 'notpressed'}`"
      :title="mainTitle"
      :disabled="store.onSto && props.color === 'white' && !isVariable"
    >
      <slot></slot>
    </button>
  </div>
</template>
<style scoped src="../assets/button.css"></style>
