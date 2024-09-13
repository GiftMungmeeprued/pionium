<script setup>
import HistoryList from "./HistoryList.vue";
import SidePane from "./SidePane.vue";
import { store } from "./store";
import SidePaneDropdown from "./SidePaneDropdown.vue";

function clearHistory() {
  store.history = [];
  localStorage.setItem("calcHistory", JSON.stringify(store.history));
  store.id = 0;
  localStorage.setItem("historyId", store.id);
}
</script>

<template>
  <SidePane sidepane-id="historySidePane" sidepane-label="history sidepane">
    <div
      class="offcanvas-header z-40 sticky top-0 py-2 px-5 border-solid border-b border-0 border-neutral-300 dark:border-neutral-600"
    >
      <h1
        class="offcanvas-title m-0 text-gray-800 dark:text-white"
        id="historySidepaneLabel"
      >
        <i class="pi pi-history text-lg align-[-1px]"></i>
        <span class="font-bold text-xl"> History </span>
        <SidePaneDropdown :clear-function="clearHistory" />
      </h1>
    </div>
    <div
      id="no-history"
      class="text-center dark:text-white"
      v-if="store.history.length === 0"
    >
      <img
        v-if="store.darkmode"
        src="../assets/no-history-dark.svg"
        alt="Empty history icon"
        class="m-auto my-10 w-[200px]"
      />
      <img
        v-else
        src="../assets/no-history.svg"
        alt="Empty history icon"
        class="m-auto my-10 w-[200px]"
      />
      No calculation history yet
    </div>
    <HistoryList v-else />
  </SidePane>
</template>
