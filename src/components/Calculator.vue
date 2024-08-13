<script setup>
import NumberPad from "./NumberPad.vue";
import Functions from "./Functions.vue";
import Screen from "./Screen.vue";
import BasicFunctions from "./BasicFunctions.vue";
import Exp from "./Exp.vue";
</script>
<template>
  <main class="flex flex-col items-center content-end h-screen">
    <Screen class="grow" />
    <Functions />
    <!-- <Exp /> -->
    <!-- <BasicFunctions /> -->
    <NumberPad />
  </main>
</template>

<style>
abbr {
  text-decoration: none;
}
</style>
