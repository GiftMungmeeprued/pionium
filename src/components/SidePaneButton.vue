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
  <button
    type="button"
    :class="`flex items-center justify-center bg-transparent rounded mx-1 h-7 w-7 sm:h-10 sm:w-10 border-solid border-2 ${
      store.showSidePane[props.sidepaneId]
        ? 'border-white/50 text-white'
        : 'border-transparent text-gray-300 hover:text-white'
    }`"
    :data-drawer-target="props.sidepaneId"
    :data-drawer-toggle="props.sidepaneId"
    data-drawer-backdrop="false"
    :aria-controls="props.sidepaneId"
    @click="
      () => {
        for (key of Object.keys(store.showSidePane)) {
          store.showSidePane[key] =
            key === props.sidepaneId
              ? !store.showSidePane[props.sidepaneId]
              : false;
        }
      }
    "
  >
    <span class="sr-only">{{ sidepaneLabel }}</span>
    <slot></slot>
  </button>
</template>
