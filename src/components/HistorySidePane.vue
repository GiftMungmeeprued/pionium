<script setup>
import HistoryList from "./HistoryList.vue";
import SidePane from "./SidePane.vue";
</script>

<template>
  <SidePane sidepane-id="historySidePane" sidepane-label="history sidepane">
    <HistoryList />
  </SidePane>
</template>
<!-- <style>
#history-sidepane {
  /* width: 206px; */
  width: 416px;
}
@media (max-width: 416px) {
  .offcanvas {
    transition: none !important;
  }
}

@media (min-width: 640px) {
  .offcanvas {
    visibility: hidden;
  }
}
</style> -->
