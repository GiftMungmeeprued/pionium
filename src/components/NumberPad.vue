<script setup>
import { ref } from "vue";
import Button from "./Button.vue";

const shift = ref(false);
</script>
<template>
  <div :class="`bg-gray-200 grid grid-cols-[repeat(5,_1fr)] m-0.5 gap-1`">
    <Button center-upper="CONST">7</Button>
    <Button center-upper="CONV">8</Button>
    <Button center-upper="CLR">9</Button>
    <Button center-upper="INS"><i class="pi pi-delete-left"></i></Button>
    <Button center-upper="OFF">AC</Button>
    <Button center-upper="MATRIX">4</Button>
    <Button center-upper="VECTOR">5</Button>
    <Button>6</Button>
    <Button center-upper="nPr">×</Button>
    <Button center-upper="nCr">÷</Button>
    <Button center-upper="STAT">1</Button>
    <Button center-upper="CMPLX">2</Button>
    <Button center-upper="BASE">3</Button>
    <Button center-upper="Pol">+</Button>
    <Button center-upper="Rec">–</Button>
    <Button center-upper="Rnd">0</Button>
    <Button left-upper="Ran#">.</Button>
    <Button left-upper="π" right-upper="e" :left-math="true" :right-math="true">
      ×10<sup
        ><math><mi>x</mi></math></sup
      >
    </Button>
    <Button>Ans</Button>
    <Button>=</Button>
  </div>
</template>
<style>
.rtl-grid {
  direction: rtl;
}
.button-grid {
  grid-template-columns: repeat(3, minmax(2.5rem, 1fr));
}
</style>
