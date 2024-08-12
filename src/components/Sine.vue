<script setup>
import SmallButton from "./SmallButton.vue";
const sines = [
  "sin",
  "cos",
  "tan",
  "csc",
  "sec",
  "cot",
  "sinh",
  "cosh",
  "tanh",
  "csch",
  "sech",
  "coth",
];
</script>
<template>
  <div class="bg-gray-200 gap-1 my-2 mx-1 grid grid-cols-3">
    <SmallButton
      v-for="func in sines"
      :key="func"
      class="relative flex items-center justify-center"
    >
      <div class="text-right">
        <sup class="text-[8px] text-gray-400 absolute top-[5px] right-0.5"
          >-1</sup
        >
      </div>
      <div class="text-xs">
        <math display="inline">
          <mi>{{ func }}</mi>
        </math>
      </div>
    </SmallButton>
  </div>
</template>
<style>
.shift {
  position: relative;
  top: -8px;
  left: 11px;
  text-align: right;
}
</style>
