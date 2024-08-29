<template>
  <Menu as="div" class="relative inline-block text-left">
    <div>
      <MenuButton class="inline">
        <i
          class="pi pi-ellipsis-v text-sm border-solid rounded-full border-transparent hover:bg-gray-200 active:bg-gray-300 p-1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        ></i>
      </MenuButton>
    </div>

    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <MenuItems
        class="w-max absolute left-0 z-10 mt-2 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <div class="py-1">
          <MenuItem v-slot="{ active }">
            <a
              :class="[
                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                'block px-4 py-2 text-sm',
              ]"
              @click="props.clearFunction"
            >
              <TrashIcon class="size-5 align-text-top text-gray-600 inline" />
              Clear all</a
            >
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script setup>
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { TrashIcon } from "@heroicons/vue/16/solid";
const props = defineProps({
  clearFunction: {
    type: Function,
    default: null,
  },
});
</script>
