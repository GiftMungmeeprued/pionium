<script setup>
import { VariableIcon } from "@heroicons/vue/24/outline";
import SidePaneButton from "./SidePaneButton.vue";
import Logo from "./Logo.vue";
</script>

<template>
  <nav class="bg-gray-800 dark:bg-[#181b1eff] min-w-[320px]">
    <div class="px-2">
      <div
        class="relative flex sm:h-16 h-10 items-center justify-between sm:px-5"
      >
        <div class="flex flex-1 items-stretch justify-start">
          <Logo class="h-[26px] w-[26px] tall:h-[40px] tall:w-[40px]" />
        </div>
        <div
          class="flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
        >
          <a href="https://ko-fi.com/pionium" target="_blank">
            <div
              class="rounded-full bg-[#434b57] px-2 mr-2 tall:py-1 tall:px-3 tall:mr-5"
            >
              <img
                src="../assets/kofi_logo.png"
                alt="Donate on Ko-fi"
                class="w-[20px] mb-[3px] mr-[5px] inline tall:w-[30px] tall:mb-[5px]"
              /><span
                class="text-white align-[1px] mr-[3px] text-xs nunito-regular tall:text-base"
                >Donate</span
              >
            </div>
          </a>
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

<style scoped>
.nunito-regular {
  font-family: "Nunito", sans-serif;
  font-optical-sizing: auto;
  font-weight: 600;
  font-style: normal;
}
</style>
