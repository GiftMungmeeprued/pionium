<script setup>
defineProps({
  leftTitle: {
    type: String,
    default: "",
  },
  rightTitle: {
    type: String,
    default: "",
  },
  centerTitle: {
    type: String,
    default: "",
  },
  mainTitle: {
    type: String,
    default: "",
  },
  centerUpper: {
    type: Boolean,
    default: false,
  },
  upperSpace: {
    type: Boolean,
    default: true,
  },
});
</script>
<template scoped>
  <div class="flex flex-col">
    <div
      v-if="centerUpper"
      :title="centerTitle"
      class="h-6 text-center px-1 font-mono"
    >
      <slot name="center"></slot>
    </div>
    <div v-else class="h-6">
      <span :title="leftTitle" class="text-left px-1 float-left font-mono">
        <slot name="left"></slot>
      </span>
      <span :title="rightTitle" class="text-right px-1 float-right font-mono"
        ><slot name="right"></slot
      ></span>
    </div>
    <button
      type="button"
      :title="mainTitle"
      class="button bg-white hover:bg-gray-100 text-gray-800 font-semibold border border-gray-400 rounded shadow w-20 h-12 text-3xl text-center"
    >
      <slot></slot>
    </button>
  </div>
</template>
<style>
.button {
  direction: ltr;
}
</style>
