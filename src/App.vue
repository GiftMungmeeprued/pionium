<script setup>
import Calculator from "./components/Calculator.vue";
import HistorySidePane from "./components/HistorySidePane.vue";
import Navbar from "./components/Navbar.vue";
import VariableSidePane from "./components/VariableSidePane.vue";
import SearchBox from "./components/SearchBox.vue";
import SearchBoxSI from "./components/SearchBoxSI.vue";
import { store } from "./components/store";
import { onMounted } from "vue";
import Toolbar from "./components/Toolbar.vue";

onMounted(() => {
  // configure dark/light theme
  const localStorageDark = localStorage.getItem("darkmode");
  store.darkmode = localStorageDark ? localStorageDark === "true" : false;
  if (store.darkmode) {
    document.documentElement.classList.add("dark");
  }
});
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
  <Toolbar />
  <SearchBox />
  <SearchBoxSI />
</template>
