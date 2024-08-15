<script setup>
import Button from "./Button.vue";
import { store } from "./store";
</script>
<template>
  <div :class="`bg-gray-200 grid grid-cols-[repeat(5,_1fr)] m-0.5 gap-1`">
    <Button @click.prevent="$emit('typedText', '7')" center-upper="CONST"
      >7</Button
    >
    <Button @click="$emit('typedText', '8')" center-upper="CONV">8</Button>
    <Button @click="$emit('typedText', '9')" center-upper="CLR">9</Button>
    <Button @click="$emit('keystroke', 'Backspace')" center-upper="INS"
      ><i class="pi pi-delete-left"></i
    ></Button>
    <Button @click="$emit('keystroke', 'AC')" center-upper="OFF">AC</Button>
    <Button @click="$emit('typedText', '4')" center-upper="MATRIX">4</Button>
    <Button @click="$emit('typedText', '5')" center-upper="VECTOR">5</Button>
    <Button @click="$emit('typedText', '6')">6</Button>
    <Button @click="$emit('typedText', '*')" center-upper="nPr">×</Button>
    <Button @click="$emit('typedText', '/')" center-upper="nCr">÷</Button>
    <Button @click="$emit('typedText', '1')" center-upper="STAT">1</Button>
    <Button @click="$emit('typedText', '2')" center-upper="CMPLX">2</Button>
    <Button @click="$emit('typedText', '3')" center-upper="BASE">3</Button>
    <Button @click="$emit('typedText', '+')" center-upper="Pol">+</Button>
    <Button @click="$emit('typedText', '-')" center-upper="Rec">–</Button>
    <Button @click="$emit('typedText', '0')" center-upper="Rnd">0</Button>
    <Button @click="$emit('typedText', '.')" left-upper="Ran#">.</Button>
    <Button
      @click="$emit('typedText', '*10^')"
      left-upper="π"
      right-upper="e"
      :left-math="true"
      :right-math="true"
    >
      ×10<sup
        ><math><mi>x</mi></math></sup
      >
    </Button>
    <Button @click="$emit('typedText', '7')">Ans</Button>
    <Button @click="$emit('keystroke', 'Enter')">=</Button>
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
