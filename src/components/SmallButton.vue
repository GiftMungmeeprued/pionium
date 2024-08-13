<script setup>
defineProps({
  leftTitle: {
    type: String,
    default: "",
  },
  rightTitle: {
    type: String,
    default: "",
  },
  centerTitle: {
    type: String,
    default: "",
  },
  mainTitle: {
    type: String,
    default: "",
  },
  centerUpper: {
    type: Boolean,
    default: false,
  },
  upperSpace: {
    type: Boolean,
    default: true,
  },
  // leftMath: {
  //   type: Boolean,
  //   default: false,
  // },
  // rightMath: {
  //   type: Boolean,
  //   default: false,
  // },
});
</script>
<template>
  <div class="flex flex-col">
    <div
      v-if="centerUpper"
      class="text-center px-1 font-mono text-sm"
      :title="centerTitle"
      :class="{ 'h-5': upperSpace }"
    >
      <slot name="center"></slot>
    </div>
    <div v-else :class="{ 'h-5': upperSpace }">
      <span
        class="text-left px-1 float-left font-mono text-sm"
        :title="leftTitle"
      >
        <slot name="left"></slot>
      </span>
      <span
        class="text-right px-1 float-right font-mono text-sm"
        :title="rightTitle"
      >
        <slot name="right"></slot>
      </span>
    </div>

    <!-- <div v-else class="h-5">
      <span v-if="leftMath" class="text-left px-1 float-left text-sm">
        <math>
          <mi>{{ leftUpper }}</mi>
        </math>
      </span>
      <span v-else class="text-left px-1 float-left font-mono text-sm">
        {{ leftUpper }}
      </span>
      <span v-if="rightMath" class="text-right px-1 float-right text-sm"
        ><math>
          <mi>{{ rightUpper }}</mi>
        </math>
      </span>
      <span v-else class="text-right px-1 float-right font-mono text-sm">{{
        rightUpper
      }}</span>
    </div> -->
    <button
      type="button"
      class="button bg-white hover:bg-gray-100 text-gray-800 font-semibold border border-gray-400 rounded shadow h-8 px-0.5 py-0"
      :title="mainTitle"
    >
      <slot></slot>
    </button>
  </div>
</template>
