<script setup>
import { store } from "./store";
import HistoryItem from "./HistoryItem.vue";
import { TrashIcon } from "@heroicons/vue/16/solid";
import SidePaneDropdown from "./SidePaneDropdown.vue";
function clearHistory() {
  store.history = [];
  localStorage.setItem("calcHistory", JSON.stringify(store.history));
}
</script>
<template>
  <div
    class="offcanvas-header py-2 px-5 border-solid border-b border-0 border-neutral-300"
  >
    <h1 class="offcanvas-title m-0 text-gray-800" id="historySidepaneLabel">
      <i class="pi pi-history text-lg text-gray-800 align-[-1px]"></i>
      <span class="font-bold text-xl"> History </span>
      <SidePaneDropdown :clear-function="clearHistory" />
    </h1>
  </div>

  <div class="offcanvas-body p-0">
    <HistoryItem v-for="item in store.history" :item="item" :key="item.id" />
  </div>
</template>
