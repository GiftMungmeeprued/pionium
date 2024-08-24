<template>
  <button
    type="button"
    class="btn btn-primary me-3"
    data-bs-toggle="offcanvas"
    data-bs-target="#history-sidepane"
  >
    Toggle offcanvas
  </button>
  <div
    class="offcanvas offcanvas-end box-content font-sans"
    data-bs-scroll="true"
    data-bs-backdrop="false"
    tabindex="-1"
    id="history-sidepane"
    aria-labelledby="historySidepaneLabel"
  >
    <div
      class="offcanvas-header py-2 px-5 border-solid border-b border-0 border-neutral-300"
    >
      <h3 class="offcanvas-title m-0" id="historySidepaneLabel">
        <i class="pi pi-history"></i>
        History
      </h3>
      <button
        type="button"
        class="btn-close text-reset"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <div class="offcanvas-body">mousemouse</div>
  </div>
</template>

<script>
export default {
  methods: {
    toggle() {
      this.open = !this.open;
    },
  },
};
</script>
<style scoped>
#history-sidepane {
  width: 416px;
}
</style>
