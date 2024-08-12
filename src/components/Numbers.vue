<script setup>
import Button from "./Button.vue";
</script>
<template>
  <div
    :class="`rtl-grid bg-gray-200 grid grid-cols-[repeat(3,_minmax(2.5rem,_1fr))] grid-rows-4 m-0.5 gap-1`"
  >
    <Button
      v-for="i in Array.from({ length: 9 }, (_, i) => i + 1).reverse()"
      :key="i"
      >{{ i }}</Button
    >
    <Button>×10<sup>x</sup></Button>
    <Button>.</Button>
    <Button>0</Button>
  </div>
</template>
<style>
.rtl-grid {
  direction: rtl;
}
.button-grid {
  grid-template-columns: repeat(3, minmax(2.5rem, 1fr));
}
</style>
