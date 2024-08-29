<script setup>
import HistoryList from "./HistoryList.vue";
import SidePane from "./SidePane.vue";
import { store } from "./store";
</script>

<template>
  <SidePane sidepane-id="historySidePane" sidepane-label="history sidepane">
    <HistoryList />
    <div id="no-history" class="text-center" v-if="store.history.length === 0">
      <img
        src="../assets/no-history.svg"
        alt="Empty history icon"
        class="m-auto my-10 w-[200px]"
      />
      No calculation history yet
    </div>
  </SidePane>
</template>
