<script setup>
import VariableList from "./VariableList.vue";
import SidePane from "./SidePane.vue";
import { store } from "./store";
import SidePaneDropdown from "./SidePaneDropdown.vue";
import { VariableIcon } from "@heroicons/vue/24/outline";

function clearVariable() {
  nerdamer.clearVars();
  store.variables = {};
  localStorage.setItem("calcVariables", JSON.stringify(store.variables));
}
</script>

<template>
  <SidePane sidepane-id="variableSidePane" sidepane-label="variable sidepane">
    <div
      class="offcanvas-header sticky top-0 py-2 px-4 border-solid border-b border-0 border-neutral-300 bg-white"
    >
      <h1 class="offcanvas-title m-0 text-gray-800" id="historySidepaneLabel">
        <VariableIcon class="size-6 text-gray-800 align-[-5px] inline" />
        <span class="font-bold text-xl"> Variables </span>
        <SidePaneDropdown :clear-function="clearVariable" />
      </h1>
    </div>
    <VariableList />
  </SidePane>
  <!-- <div
    class="offcanvas offcanvas-end box-content font-sans"
    data-bs-scroll="true"
    data-bs-backdrop="false"
    tabindex="-1"
    id="variable-sidepane"
    aria-labelledby="historySidepaneLabel"
  >
    <VariableList />
  </div> -->
</template>
<!-- <style scoped>
#history-sidepane {
  width: 416px;
  height: 800px;
}
@media (max-width: 416px) {
  #history-sidepane {
    transition: none !important;
  }
}
</style> -->
