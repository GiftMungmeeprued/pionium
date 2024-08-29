<script setup>
import { CalculatorIcon } from "@heroicons/vue/16/solid";
import { VariableIcon } from "@heroicons/vue/24/outline";
import SidePaneButton from "./SidePaneButton.vue";
</script>

<template>
  <nav class="bg-gray-800 min-w-[320px]">
    <div class="px-2">
      <div
        class="relative flex sm:h-16 h-10 items-center justify-between sm:px-5"
      >
        <div class="flex flex-1 items-stretch justify-start">
          <div class="flex flex-shrink-0 items-start">
            <CalculatorIcon class="size-6 sm:size-8 align-middle text-white" />
          </div>
        </div>
        <div
          class="flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
        >
          <SidePaneButton
            sidepane-id="historySidePane"
            sidepane-label="history sidepane"
          >
            <i
              class="pi pi-history sm:text-xl text-base align-[-0.15em] mx-1"
            ></i
          ></SidePaneButton>
          <SidePaneButton
            sidepane-id="variableSidePane"
            sidepane-label="variable sidepane"
          >
            <VariableIcon class="size-6 sm:size-8 m-0"
          /></SidePaneButton>
        </div>
      </div>
    </div>
  </nav>
</template>
