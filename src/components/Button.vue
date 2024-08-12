<script setup>
defineProps({
  leftUpper: {
    type: String,
    default: "",
  },
  rightUpper: {
    type: String,
    default: "",
  },
  centerUpper: {
    type: String,
    default: "",
  },
  // leftMath: {
  //   type: bool,
  //   default: false,
  // },
  // rightMath: {
  //   type: bool,
  //   default: false,
  // },
});
</script>
<template scoped>
  <div class="flex flex-col">
    <div v-if="centerUpper" class="text-center px-1 font-mono">
      {{ centerUpper }}
    </div>
    <div v-else class="h-6">
      <!-- <math v-if="leftMath">
        <mi>{{ leftUpper }}</mi>
      </math> -->
      <span class="text-left px-1 float-left">{{ leftUpper }}</span>
      <span class="text-right px-1 float-right">{{ rightUpper }}</span>
    </div>
    <button
      type="button"
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
