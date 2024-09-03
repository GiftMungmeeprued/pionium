<script setup>
import { store } from "./store";
const props = defineProps({
  sidepaneId: {
    type: String,
    default: "defaultSidePane",
  },
  sidepaneLabel: {
    type: String,
    default: "side pane",
  },
});
</script>
<template>
  <aside
    :id="props.sidepaneId"
    class="fixed sm:relative top-0 left-auto right-0 z-40 w-full sm:w-1/3 h-screen sm:h-full transition-transform translate-x-full sm:translate-x-0 border border-neutral-300"
    :aria-label="sidepaneLabel"
    v-show="store.showSidePane[props.sidepaneId]"
  >
    <div
      class="sm:absolute h-full w-full p-0 bg-white dark:bg-gray-800 overflow-auto"
    >
      <button
        type="button"
        :data-drawer-hide="props.sidepaneId"
        :aria-controls="props.sidepaneId"
        class="sm:invisible z-50 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
        @click="
          () => {
            store.showSidePane[props.sidepaneId] = false;
          }
        "
      >
        <svg
          class="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
        <span class="sr-only">Close menu</span>
      </button>
      <slot></slot>
    </div>
  </aside>
</template>
