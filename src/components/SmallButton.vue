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
    class="button bg-white hover:bg-gray-100 text-gray-800 font-semibold border border-gray-400 rounded shadow w-8 h-6 px-0.5 py-0"
  >
    <slot></slot>
  </button>
</template>
