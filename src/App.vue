<script setup>
import Calculator from "./components/Calculator.vue";
import HistorySidePane from "./components/HistorySidePane.vue";
import Navbar from "./components/Navbar.vue";
import VariableSidePane from "./components/VariableSidePane.vue";
</script>
<template>
  <div id="page" class="h-full flex flex-col justify-items-stretch">
    <Navbar />
    <div id="content" class="flex flex-row justify-stretch grow">
      <div id="calculator" class="grow h-full"><Calculator /></div>
      <HistorySidePane />
      <VariableSidePane />
    </div>
  </div>
</template>
