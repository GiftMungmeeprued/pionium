<script setup>
defineProps({
  value: {
    type: String,
    default: "",
  },
});
</script>
<template>
  <button
    type="button"
    class="button bg-white hover:bg-gray-100 text-gray-800 font-semibold border border-gray-400 rounded shadow text-center w-10 h-7"
  >
    <slot></slot>
  </button>
</template>
<style>
.button {
  direction: ltr;
}
</style>
