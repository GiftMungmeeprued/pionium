<script setup>
import Calculator from "./components/Calculator.vue";
import HistorySidePane from "./components/HistorySidePane.vue";
import Navbar from "./components/Navbar.vue";
import VariableSidePane from "./components/VariableSidePane.vue";
</script>
<template>
  <Navbar />
  <div id="content" class="h-full flex flex-row justify-stretch">
    <div id="calculator" class="grow h-full"><Calculator /></div>
    <HistorySidePane />
    <VariableSidePane />
  </div>
</template>
