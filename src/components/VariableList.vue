<script setup>
import { store } from "./store";
import { VariableIcon } from "@heroicons/vue/24/outline";
import VariableItem from "./VariableItem.vue";
import SidePaneDropdown from "./SidePaneDropdown.vue";
import nerdamer from "nerdamer-prime";

function clearVariable() {
  nerdamer.clearVars();
  store.variables = {};
  localStorage.setItem("calcVariables", JSON.stringify(store.variables));
}
</script>
<template>
  <div
    class="offcanvas-header py-2 px-4 border-solid border-b border-0 border-neutral-300"
  >
    <h1 class="offcanvas-title m-0 text-gray-800" id="historySidepaneLabel">
      <VariableIcon class="size-6 text-gray-800 align-[-5px] inline" />
      <span class="font-bold text-xl"> Variables </span>
      <SidePaneDropdown :clear-function="clearVariable" />
    </h1>
  </div>
  <div class="offcanvas-body py-0 px-5 relative overflow-x-auto">
    <table class="table-auto text-left w-full">
      <thead
        class="text-gray-800 bg-gray-50 border-solid border-b border-0 border-neutral-300 text-sm font-sans"
      >
        <tr>
          <th class="py-3 text-center">Variable</th>
          <th class="py-3 pl-10">Value</th>
        </tr>
      </thead>
      <tbody>
        <VariableItem
          v-for="variable_name in store.variableList"
          :variable="variable_name"
        />
      </tbody>
    </table>
  </div>
</template>
