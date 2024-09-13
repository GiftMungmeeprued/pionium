<script setup>
import { onMounted, ref } from "vue";
import { initTooltips } from "flowbite";

const defaultIcon = ref(null);
const successIcon = ref(null);

const defaultTooltipMessage = ref(null);
const successTooltipMessage = ref(null);

async function handleCopy() {
  const MQ = MathQuill.getInterface(2);
  const mathField = MQ.MathField(document.getElementById("math-field"));
  const answerField = MQ.StaticMath(document.getElementById("answer"));

  try {
    await navigator.clipboard.writeText(
      mathField.latex() + answerField.latex()
    );
    showSuccess();

    // reset to default state
    setTimeout(() => {
      resetToDefault();
    }, 2000);
  } catch (error) {
    console.error(error.message);
  }
}

const showSuccess = () => {
  defaultIcon.value.classList.add("hidden");
  successIcon.value.classList.remove("hidden");
  defaultTooltipMessage.value.classList.add("hidden");
  successTooltipMessage.value.classList.remove("hidden");
  const tooltip = FlowbiteInstances.getInstance(
    "Tooltip",
    "tooltip-copy-npm-install-copy-button"
  );
  tooltip.show();
};

const resetToDefault = () => {
  defaultIcon.value.classList.remove("hidden");
  successIcon.value.classList.add("hidden");
  defaultTooltipMessage.value.classList.remove("hidden");
  successTooltipMessage.value.classList.add("hidden");
  const tooltip = FlowbiteInstances.getInstance(
    "Tooltip",
    "tooltip-copy-npm-install-copy-button"
  );
  tooltip.hide();
};

onMounted(() => {
  initTooltips();
});
</script>

<template>
  <div class="flex items-center">
    <button
      @click="handleCopy()"
      data-tooltip-target="tooltip-copy-npm-install-copy-button"
      data-tooltip-placement="bottom"
      class="text-gray-500 hover:text-gray-700 dark:text-[#c2c7cbff] dark:hover:text-white h-6"
    >
      <span id="default-icon" ref="defaultIcon" class="relative -top-[1px]">
        <i class="pi pi-copy text-sm"></i>
      </span>
      <span id="success-icon" ref="successIcon" class="hidden">
        <svg
          class="w-3.5 h-3.5 text-blue-500"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 16 12"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M1 5.917 5.724 10.5 15 1.5"
          />
        </svg>
      </span>
    </button>
    <div
      id="tooltip-copy-npm-install-copy-button"
      role="tooltip"
      class="z-10 px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg opacity-0 tooltip dark:bg-gray-700"
    >
      <span id="default-tooltip-message" ref="defaultTooltipMessage"
        >Copy as LaTeX</span
      >
      <span
        id="success-tooltip-message"
        ref="successTooltipMessage"
        class="hidden"
        >Copied!</span
      >
      <div class="tooltip-arrow" data-popper-arrow></div>
    </div>
  </div>
</template>
