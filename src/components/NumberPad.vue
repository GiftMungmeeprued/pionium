<script setup>
import Button from "./Button.vue";
import { store, resetShiftAlpha } from "./store";
</script>
<template>
  <div :class="`bg-gray-200 grid grid-cols-[repeat(5,_1fr)] m-0.5 gap-1`">
    <Button
      @click="
        store.onShift
          ? console.log('const')
          : store.onAlpha
          ? resetShiftAlpha
          : $emit('typedText', '7')
      "
      :center-upper="true"
      center-title="Scientific constants"
    >
      <template v-slot:center>CONST</template>
      7
    </Button>
    <Button
      @click="$emit('typedText', '8')"
      :center-upper="true"
      center-title="Unit Conversions"
    >
      <template v-slot:center>CONV</template>
      8</Button
    >
    <Button
      @click="$emit('typedText', '9')"
      :center-upper="true"
      center-title="Clear all setups and memory"
    >
      <template v-slot:center>CLR</template>
      9</Button
    >
    <Button
      @click="$emit('keystroke', 'Backspace')"
      :center-upper="true"
      center-title="Insert"
    >
      <template v-slot:center>INS</template>
      <i class="pi pi-delete-left"></i
    ></Button>
    <Button
      @click="$emit('keystroke', 'AC')"
      :center-upper="true"
      center-title=""
    >
      <template v-slot:center>OFF</template>
      AC
    </Button>
    <Button
      @click="$emit('typedText', '4')"
      :center-upper="true"
      center-title="Matrix mode"
    >
      <template v-slot:center>MATRIX</template>
      4</Button
    >
    <Button
      @click="$emit('typedText', '5')"
      :center-upper="true"
      center-title="Vector mode"
    >
      <template v-slot:center>VECTOR</template>
      5</Button
    >
    <Button @click="$emit('typedText', '6')">6</Button>
    <Button
      @click="$emit('typedText', '*')"
      :center-upper="true"
      center-title="Permutations nPr(n,r) for arranging r items from n items"
    >
      <template v-slot:center>nPr</template>
      ×</Button
    >
    <Button
      @click="$emit('typedText', '/')"
      :center-upper="true"
      center-title="Combinations nCr(n,r) for selecting r items from n items"
      ><template v-slot:center>nCr</template>÷</Button
    >
    <Button
      @click="$emit('typedText', '1')"
      :center-upper="true"
      center-title="Statistics mode"
      ><template v-slot:center>STAT</template>1</Button
    >
    <Button
      @click="$emit('typedText', '2')"
      :center-upper="true"
      center-title="Complex calculations"
      ><template v-slot:center>CMPLX</template>2</Button
    >
    <Button
      @click="$emit('typedText', '3')"
      :center-upper="true"
      center-title="Base-n calculations"
      ><template v-slot:center>BASE</template>3</Button
    >
    <Button
      @click="$emit('typedText', '+')"
      :center-upper="true"
      center-title="Pol(x,y)=(r,θ) convert cartesian to polar coordinates"
      ><template v-slot:center>Pol</template>+</Button
    >
    <Button
      @click="$emit('typedText', '-')"
      :center-upper="true"
      center-title="Rec(r,θ)=(x,y) convert polar to cartesian coordinates"
      ><template v-slot:center>Rec</template>–</Button
    >
    <Button
      @click="$emit('typedText', '0')"
      :center-upper="true"
      center-title="Generate random number from 0 to 1"
    >
      <template v-slot:center>Ran#</template>
      0</Button
    >
    <Button
      @click="$emit('typedText', '.')"
      :center-upper="true"
      center-title="RanInt(a,b) generates random integer from a to b"
    >
      <template v-slot:center>RanInt</template>
      .</Button
    >
    <Button
      @click="
        store.onShift
          ? $emit('typedText', 'pi')
          : store.onAlpha
          ? $emit('typedText', 'e')
          : $emit('typedText', '*10^')
      "
      left-title="Pi"
      right-title="Euler's number"
    >
      <template v-slot:left
        ><math><mi>π</mi></math></template
      >
      <template v-slot:right
        ><math><mi>e</mi></math></template
      >
      ×10<sup
        ><math><mi>x</mi></math></sup
      >
    </Button>
    <Button
      @click="$emit('typedText', '7')"
      :center-upper="true"
      center-title="Convert between degrees, radians, and gradians"
    >
      <template v-slot:center>DRG<small>▶</small></template
      >Ans</Button
    >
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
