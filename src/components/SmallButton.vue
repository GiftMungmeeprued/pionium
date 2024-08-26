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
<template>
  <div class="flex flex-col">
    <div
      v-if="centerUpper"
      class="text-center px-1 font-mono text-xs tall:text-sm"
      :title="centerTitle"
      :class="{ 'h-4 tall:h-5': upperSpace }"
    >
      <slot name="center"></slot>
    </div>
    <div v-else :class="{ 'h-4 tall:h-5': upperSpace }">
      <span
        class="text-left pl-1 float-left font-mono text-xs tall:text-sm"
        :title="leftTitle"
      >
        <slot name="left"></slot>
      </span>
      <span
        class="text-right pr-1 float-right font-mono text-xs tall:text-sm"
        :title="rightTitle"
      >
        <slot name="right"></slot>
      </span>
    </div>

    <button
      type="button"
      class="button bg-white hover:bg-gray-100 text-gray-800 font-semibold border border-gray-400 rounded shadow px-0.5 py-0 h-6 tall:h-8 text-xs tall:text-lg"
      :title="mainTitle"
    >
      <slot></slot>
    </button>
  </div>
</template>
