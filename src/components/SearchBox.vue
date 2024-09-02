<script setup></script>
<template>
  <!-- SearchBox -->
  <button
    type="button"
    class="hidden"
    aria-haspopup="dialog"
    aria-expanded="false"
    aria-controls="physical-constants"
    data-hs-overlay="#physical-constants"
  ></button>

  <!-- SearchBox Modal -->
  <div
    id="physical-constants"
    class="hs-overlay hs-overlay-open:opacity-100 hs-overlay-open:duration-500 hidden size-full fixed top-0 start-0 z-[80] opacity-0 overflow-x-hidden transition-all overflow-y-auto pointer-events-none"
    role="dialog"
    tabindex="-1"
    aria-labelledby="physical-constants-label"
  >
    <div
      class="hs-overlay-open:opacity-100 hs-overlay-open:duration-500 opacity-0 transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto"
    >
      <div
        class="flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70"
      >
        <div
          class="relative"
          data-hs-combo-box='{
        "preventVisibility": true,
        "groupingType": "tabs",
        "isOpenOnFocus": true,
        "apiUrl": "src/assets/constants.json",
        "apiGroupField": "category",
        "outputItemTemplate": "<div role=\"button\" onclick=\"handleConst(this)\" class=\"cursor-pointer p-2 space-y-0.5 w-full text-sm text-gray-800 hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-neutral-200 dark:focus:bg-neutral-700\" data-hs-combo-box-output-item><div class=\"grid grid-cols-2 justify-between items-center w-full\"><div data-hs-combo-box-output-item-field=\"name\" data-hs-combo-box-search-text></div><div class=\"pl-10 justify-self-end\" data-hs-combo-box-output-item-field=\"symbol\"></div><div class=\"col-span-2\"><span data-hs-combo-box-output-item-field=\"value\" data-hs-combo-box-search-text></span> <span data-hs-combo-box-output-item-field=\"unit\"></span><span class=\"hidden\" data-hs-combo-box-output-item-field=\"constant\" data-hs-combo-box-search-text></span><span class=\"hidden\" data-hs-combo-box-value></span></div></div></div></div>",
        "groupingTitleTemplate": "<button type=\"button\" class=\"capitalize py-1 px-2 inline-flex items-center gap-x-2 text-sm text-nowrap rounded-md border border-gray-200 bg-white text-gray-600 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-100 hs-combo-box-tab-active:bg-blue-600 hs-combo-box-tab-active:border-blue-600 hs-combo-box-tab-active:focus:border-blue-600 hs-combo-box-tab-active:text-white disabled:opacity-50 disabled:pointer-events-none dark:hs-combo-box-tab-active:bg-blue-500 dark:hs-combo-box-tab-active:text-white dark:hs-combo-box-tab-active:border-blue-500 dark:hs-combo-box-tab-active:focus:border-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700\"></button>",
        "tabsWrapperTemplate": "<div class=\"overflow-x-auto py-2 px-4 rounded-t-xl border-b border-gray-200 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-800 dark:border-neutral-700\"></div>"
      }'
        >
          <!-- "outputItemTemplate": "<div role=\"button\" onclick=\"handleConst(this)\" class=\"cursor-pointer p-2 space-y-0.5 w-full text-sm text-gray-800 hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-neutral-200 dark:focus:bg-neutral-700\" data-hs-combo-box-output-item><div class=\"grid grid-cols-2 justify-between items-center w-full\"><div data-hs-combo-box-output-item-field=\"name\" data-hs-combo-box-search-text data-hs-combo-box-value=\"\"></div><div class=\"pl-10 justify-self-end\" data-hs-combo-box-output-item-field=\"symbol\"></div><div class=\"col-span-2\"><span data-hs-combo-box-output-item-field=\"value\" data-hs-combo-box-search-text></span> <span data-hs-combo-box-output-item-field=\"unit\"></span><span class=\"hidden\" data-hs-combo-box-output-item-field=\"constant\" data-hs-combo-box-search-text></span></div></div></div></div>", -->

          <!-- "outputItemTemplate": "<div class=\"cursor-pointer p-2 space-y-0.5 w-full text-sm text-gray-800 hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-neutral-200 dark:focus:bg-neutral-700\" data-hs-combo-box-output-item><div class=\"grid grid-cols-2 justify-between items-center w-full\"><div data-hs-combo-box-output-item-field=\"name\" data-hs-combo-box-search-text data-hs-combo-box-value=\"\"></div><div class=\"pl-10 justify-self-end\" data-hs-combo-box-output-item-field=\"symbol\"></div><div class=\"col-span-2\"><span data-hs-combo-box-output-item-field=\"value\" data-hs-combo-box-search-text></span> <span data-hs-combo-box-output-item-field=\"unit\"></span><span class=\"hidden\" data-hs-combo-box-output-item-field=\"constant\" data-hs-combo-box-search-text></span></div></div></div></div>", -->
          <div
            class="relative p-4 border-b border-gray-200 dark:border-neutral-700"
          >
            <label
              id="physical-constants-label"
              for="physical-constants-input"
              class="sr-only"
              >Search input</label
            >
            <div class="relative">
              <div
                class="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-3.5"
              >
                <svg
                  class="shrink-0 size-4 text-gray-400 dark:text-white/60"
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
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </svg>
              </div>
              <input
                id="physical-constants-input"
                class="py-3 ps-10 pe-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                type="text"
                role="combobox"
                aria-expanded="false"
                placeholder="Type the name of the physical constant"
                value=""
                autofocus=""
                data-hs-combo-box-input=""
              />
            </div>
          </div>

          <!-- SearchBox Modal Body -->
          <div class="!mt-0" data-hs-combo-box-output="">
            <div
              class="h-72 p-2 overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
              data-hs-combo-box-output-items-wrapper=""
            ></div>
          </div>
          <!-- SearchBox Modal Body -->
        </div>
      </div>
    </div>
    <!-- End SearchBox Modal -->
  </div>
  <!-- End SearchBox -->
</template>
