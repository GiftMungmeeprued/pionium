<script setup>
import { store } from "./store";
</script>
<template>
  <button
    v-show="store.displaymodes.length > 1"
    @mousedown="$emit('toggledisplay')"
    type="button"
    class="button rubik-font font-bold rounded w-6 h-6 self-center text-[10px] bg-[#CBCED5] mr-1 uppercase"
  >
    {{ store.displaymodes[store.displaymodeId] }}
  </button>
</template>
