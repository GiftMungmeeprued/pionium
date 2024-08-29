<script setup>
import VariableList from "./VariableList.vue";
import SidePane from "./SidePane.vue";
</script>

<template>
  <SidePane sidepane-id="variableSidePane" sidepane-label="variable sidepane">
    <VariableList />
  </SidePane>
  <!-- <div
    class="offcanvas offcanvas-end box-content font-sans"
    data-bs-scroll="true"
    data-bs-backdrop="false"
    tabindex="-1"
    id="variable-sidepane"
    aria-labelledby="historySidepaneLabel"
  >
    <VariableList />
  </div> -->
</template>
<!-- <style scoped>
#history-sidepane {
  width: 416px;
  height: 800px;
}
@media (max-width: 416px) {
  #history-sidepane {
    transition: none !important;
  }
}
</style> -->
