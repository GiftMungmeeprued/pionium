<script setup>
import { store } from "./store";
import VariableItem from "./VariableItem.vue";
</script>
<template>
  <div class="offcanvas-body py-0 px-5">
    <table class="table-auto text-left w-full">
      <thead
        class="text-gray-800 dark:text-gray-300 bg-gray-50 dark:bg-[#3d4142] border-solid border-b border-0 border-neutral-300 dark:border-neutral-600 text-sm font-sans"
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
