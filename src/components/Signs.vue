<script setup>
import Button from "./Button.vue";
</script>
<template>
  <div
    :class="`grid grid-cols-[repeat(2,_minmax(2.5rem,_1fr))] grid-rows-4 gap-1 m-0.5 bg-gray-200`"
  >
    <Button>DEL</Button>
    <Button>AC</Button>
    <Button>×</Button>
    <Button>÷</Button>
    <Button>+</Button>
    <Button>-</Button>
    <Button>Ans</Button>
    <Button>=</Button>
  </div>
</template>
