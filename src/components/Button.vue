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
  <div class="">
    <div
      v-if="centerUpper"
      :title="centerTitle"
      class="text-center px-1 font-mono text-xs h-4 tall:text-sm tall:h-5"
    >
      <slot name="center"></slot>
    </div>
    <div v-else class="">
      <span
        :title="leftTitle"
        class="text-left px-1 float-left font-mono text-xs h-4 tall:text-sm tall:h-5"
      >
        <slot name="left"></slot>
      </span>
      <span
        :title="rightTitle"
        class="text-right px-1 float-right font-mono text-xs h-4 tall:text-sm tall:h-5"
        ><slot name="right"></slot
      ></span>
    </div>
    <button
      type="button"
      :title="mainTitle"
      class="button bg-white hover:bg-gray-100 text-gray-800 font-semibold border border-gray-400 rounded shadow text-center w-full tall:h-12 tall:text-3xl h-7 text-base"
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
