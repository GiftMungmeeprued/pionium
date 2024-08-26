<script setup>
import { CalculatorIcon } from "@heroicons/vue/16/solid";
import { VariableIcon } from "@heroicons/vue/24/outline";
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
          <button
            type="button"
            class="bg-transparent border-0 mx-1"
            data-bs-toggle="offcanvas"
            data-bs-target="#history-sidepane"
          >
            <span class="sr-only">History</span>
            <i
              class="pi pi-history sm:text-xl text-base text-gray-300 hover:text-white"
            ></i>
          </button>
          <button
            type="button"
            class="bg-transparent border-0"
            data-bs-toggle="offcanvas"
            data-bs-target="#variable-sidepane"
          >
            <span class="sr-only">Variables</span>
            <VariableIcon
              class="size-6 sm:size-8 align-middle text-gray-300 hover:text-white"
            />
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>
