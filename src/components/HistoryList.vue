<script setup>
import { store } from "./store";
import HistoryItem from "./HistoryItem.vue";
</script>
<template>
  <div class="offcanvas-body p-0">
    <div class="h-full">
      <HistoryItem v-for="item in store.history" :item="item" :key="item.id" />
    </div>
  </div>
</template>
