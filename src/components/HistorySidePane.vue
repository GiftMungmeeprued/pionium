<script setup>
import { store } from "./store";
import HistoryItem from "./HistoryItem.vue";
import { TrashIcon } from "@heroicons/vue/16/solid";

function clearHistory() {
  store.history = [];
  localStorage.setItem("calcHistory", JSON.stringify(store.history));
}
</script>

<template>
  <div
    class="offcanvas offcanvas-end box-content font-sans"
    data-bs-scroll="true"
    data-bs-backdrop="false"
    tabindex="-1"
    id="history-sidepane"
    aria-labelledby="historySidepaneLabel"
  >
    <div
      class="offcanvas-header py-2 px-5 border-solid border-b border-0 border-neutral-300"
    >
      <h1 class="offcanvas-title m-0 text-gray-600" id="historySidepaneLabel">
        <i class="pi pi-history"></i>
        History
        <div class="dropdown inline">
          <i
            class="pi pi-ellipsis-v text-sm border-solid rounded-full border-transparent hover:bg-gray-200 active:bg-gray-300 p-1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          ></i>
          <ul class="dropdown-menu w-12">
            <li>
              <a class="dropdown-item text-gray-600" @click="clearHistory">
                <TrashIcon class="size-5 align-text-top text-gray-400 inline" />
                Clear all</a
              >
            </li>
          </ul>
        </div>
      </h1>
      <button
        type="button"
        class="btn-close text-reset"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <div class="offcanvas-body p-0">
      <HistoryItem v-for="item in store.history" :item="item" :key="item.id" />
    </div>
  </div>
</template>
<style scoped>
#history-sidepane {
  width: 416px;
}
@media (max-width: 416px) {
  #history-sidepane {
    transition: none !important;
  }
}
</style>
