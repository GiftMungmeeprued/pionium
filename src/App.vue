<script setup>
import Calculator from "./components/Calculator.vue";
import HistorySidePane from "./components/HistorySidePane.vue";
import Navbar from "./components/Navbar.vue";
import VariableSidePane from "./components/VariableSidePane.vue";
import SearchBox from "./components/SearchBox.vue";
import SearchBoxSI from "./components/SearchBoxSI.vue";
</script>
<template>
  <div id="page" class="h-full flex flex-col justify-items-stretch">
    <Navbar />
    <div id="content" class="flex flex-row justify-stretch grow relative">
      <div id="calculator" class="grow h-full"><Calculator /></div>
      <HistorySidePane />
      <VariableSidePane />
    </div>
  </div>
  <SearchBox />
  <SearchBoxSI />
</template>
