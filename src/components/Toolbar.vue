<script setup>
import { store } from "./store";
import { ref, onMounted, watch, computed } from "vue";

const MQ = MathQuill.getInterface(2);
const displaySetting = ref(store.displaySetting);
const exponMin = ref(store.exponMin);
const exponMax = ref(store.exponMax);
const answerFieldSampleEl = ref(null);
const sample = {
  Norm: "12\\ 345.678",
  Sci: "1.234\\ 567\\ 8 \\cdot 10^4",
  Eng: "12.345\\ 678 \\cdot 10^3",
};

function save() {
  store.displaySetting = displaySetting.value;
  store.exponMin = exponMin.value;
  store.exponMax = exponMax.value;

  localStorage.setItem("displaySetting", store.displaySetting);
  localStorage.setItem("exponMin", store.exponMin);
  localStorage.setItem("exponMax", store.exponMax);
}

function cancel() {
  displaySetting.value = store.displaySetting;
  exponMin.value = store.exponMin;
  exponMax.value = store.exponMax;
}

onMounted(() => {
  const localStorageDisplaySetting = localStorage.getItem("displaySetting");
  store.displaySetting = localStorageDisplaySetting
    ? localStorageDisplaySetting
    : "Norm";

  const localStorageExponMin = localStorage.getItem("exponMin");
  store.exponMin = localStorageExponMin ? localStorageExponMin : -2;

  const localStorageExponMax = localStorage.getItem("exponMax");
  store.exponMax = localStorageExponMax ? localStorageExponMax : 7;

  displaySetting.value = store.displaySetting;
  exponMin.value = store.exponMin;
  exponMax.value = store.exponMax;

  MQ.StaticMath(answerFieldSampleEl.value).latex(sample[displaySetting.value]);
});
watch(displaySetting, async () => {
  MQ.StaticMath(answerFieldSampleEl.value).latex(sample[displaySetting.value]);
});
</script>
<template>
  <div
    id="toolbar-modal"
    class="hs-overlay hs-overlay-open:opacity-100 hs-overlay-open:duration-500 hidden size-full fixed top-0 start-0 z-[80] opacity-0 overflow-x-hidden transition-all overflow-y-auto pointer-events-none"
    role="dialog"
    tabindex="-1"
    aria-labelledby="toolbar-modal-label"
  >
    <div class="sm:max-w-lg sm:w-full m-3 sm:mx-auto">
      <div
        class="flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70"
      >
        <div
          class="flex justify-between items-center py-3 px-4 border-b dark:border-neutral-700"
        >
          <h3
            id="toolbar-modal-label"
            class="font-bold text-gray-800 dark:text-white"
          >
            Display Settings
          </h3>
          <button
            type="button"
            class="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600"
            aria-label="Close"
            data-hs-overlay="#toolbar-modal"
          >
            <span class="sr-only">Close</span>
            <svg
              class="shrink-0 size-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </button>
        </div>
        <div class="relative h-[50px]">
          <div
            ref="answerFieldSampleEl"
            class="absolute bottom-0 left-1/3"
            id="answer-sample"
          ></div>
        </div>
        <div class="p-4 overflow-y-auto">
          <ul
            class="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <li
              class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600"
            >
              <div class="flex items-center ps-3">
                <input
                  id="norm-display"
                  type="radio"
                  value="Norm"
                  v-model="displaySetting"
                  name="display-setting"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  checked
                />
                <label
                  for="norm-display"
                  class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >Normal
                </label>
              </div>
            </li>
            <li
              class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600"
            >
              <div class="flex items-center ps-3">
                <input
                  id="sci-display"
                  type="radio"
                  value="Sci"
                  v-model="displaySetting"
                  name="display-setting"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  for="sci-display"
                  class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >Scientific</label
                >
              </div>
            </li>
            <li
              class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600"
            >
              <div class="flex items-center ps-3">
                <input
                  id="eng-display"
                  type="radio"
                  value="Eng"
                  v-model="displaySetting"
                  name="display-setting"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  for="eng-display"
                  class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >Engineering</label
                >
              </div>
            </li>
          </ul>
        </div>
        <div class="p-4" v-if="displaySetting === 'Norm'">
          <span class="block mb-1 text-sm text-gray-900 dark:text-white"
            >Displayed as decimals when the result is within the range</span
          >
          <div class="flex flex-row p-2">
            <div class="relative flex items-center flex-wrap">
              <div
                class="border border-gray-200 rounded-lg py-2 px-3 mx-2 mb-2 min-w-[150px]"
              >
                <span class="text-sm mr-2">Min:</span>
                <button
                  type="button"
                  class="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
                  @click="
                    () => {
                      exponMin--;
                    }
                  "
                  :disabled="exponMin <= -9"
                >
                  <svg
                    class="w-2.5 h-2.5 text-gray-900 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 2"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M1 1h16"
                    />
                  </svg>
                </button>
                <span class="w-10 mx-2 text-center"
                  >10<sup>{{ exponMin }}</sup></span
                >
                <button
                  type="button"
                  data-input-counter-increment="counter-input"
                  class="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
                  @click="
                    () => {
                      exponMin++;
                    }
                  "
                  :disabled="exponMin >= -1"
                >
                  <svg
                    class="w-2.5 h-2.5 text-gray-900 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 18"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 1v16M1 9h16"
                    />
                  </svg>
                </button>
              </div>
              <div
                class="border border-gray-200 rounded-lg py-2 px-3 mx-2 min-w-[150px] mb-2"
              >
                <span class="text-sm mr-2">Max:</span>
                <button
                  type="button"
                  class="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
                  @click="
                    () => {
                      exponMax--;
                    }
                  "
                  :disabled="exponMax <= 1"
                >
                  <svg
                    class="w-2.5 h-2.5 text-gray-900 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 2"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M1 1h16"
                    />
                  </svg>
                </button>
                <span class="w-10 mx-2 text-center"
                  >10<sup>{{ exponMax }}</sup></span
                >
                <button
                  type="button"
                  data-input-counter-increment="counter-input"
                  class="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
                  @click="
                    () => {
                      exponMax++;
                    }
                  "
                  :disabled="exponMax >= 9"
                >
                  <svg
                    class="w-2.5 h-2.5 text-gray-900 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 18"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 1v16M1 9h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <span class="block mb-1 text-sm text-gray-900 dark:text-white"
            >otherwise displayed as scientific notation.</span
          >
        </div>
        <div
          class="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-neutral-700"
        >
          <button
            type="button"
            class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
            @click="cancel"
            data-hs-overlay="#toolbar-modal"
          >
            Cancel
          </button>
          <button
            type="button"
            class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
            @click="save()"
            data-hs-overlay="#toolbar-modal"
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
