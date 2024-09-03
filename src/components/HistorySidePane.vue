<script setup>
import HistoryList from "./HistoryList.vue";
import SidePane from "./SidePane.vue";
import { store } from "./store";
import SidePaneDropdown from "./SidePaneDropdown.vue";

function clearHistory() {
  store.history = [];
  localStorage.setItem("calcHistory", JSON.stringify(store.history));
}
</script>

<template>
  <SidePane sidepane-id="historySidePane" sidepane-label="history sidepane">
    <div
      class="offcanvas-header z-40 sticky top-0 py-2 px-5 border-solid border-b border-0 border-neutral-300 bg-white"
    >
      <h1 class="offcanvas-title m-0 text-gray-800" id="historySidepaneLabel">
        <i class="pi pi-history text-lg text-gray-800 align-[-1px]"></i>
        <span class="font-bold text-xl"> History </span>
        <SidePaneDropdown :clear-function="clearHistory" />
      </h1>
    </div>
    <div id="no-history" class="text-center" v-if="store.history.length === 0">
      <img
        src="../assets/no-history.svg"
        alt="Empty history icon"
        class="m-auto my-10 w-[200px]"
      />
      No calculation history yet
    </div>
    <HistoryList v-else />
  </SidePane>
</template>
