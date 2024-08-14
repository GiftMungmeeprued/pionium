<script setup>
import NumberPad from "./NumberPad.vue";
import Functions from "./Functions.vue";
import Screen from "./Screen.vue";
</script>
<template>
  <main class="flex flex-col items-center content-end h-screen">
    <Screen />
    <Functions />
    <NumberPad />
  </main>
</template>

<style>
abbr {
  text-decoration: none;
}
</style>
