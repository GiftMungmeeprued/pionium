<script setup>
import SmallButton from "./SmallButton.vue";
import { store, resetShiftAlpha } from "./store";
import KeyboardShiftSolid from "./shift_key/KeyboardShiftSolid.vue";
import KeyboardShift from "./shift_key/KeyboardShift.vue";

function pressShift() {
  store.onShift = !store.onShift;
  store.onSto = false;
}

function pressSto() {
  store.onSto = !store.onSto;
  store.onShift = false;
}
</script>

<style>
.kb-shift {
  display: inline-block;
  background-size: 100%;
  background-image: url("./src/assets/shift-icon/keyboard-shift.svg");
  background-repeat: no-repeat;
}

.kb-shift-solid {
  display: inline-block;
  background-size: 100%;
  background-image: url("./src/assets/shift-icon/keyboard-shift-solid.svg");
  background-repeat: no-repeat;
}
</style>

<template>
  <div class="bg-[#E9EAEE] grid grid-cols-6 gap-1 p-1.5 pt-3">
    <!-- First row -->
    <SmallButton
      main-title="Shift key"
      @click="pressShift"
      :upper-space="false"
      color="gray"
      :on-pressed="store.onShift"
    >
      <KeyboardShiftSolid v-if="store.onShift" class="h-5 tall:h-[25px]" />
      <KeyboardShift v-else class="h-5 tall:h-[25px]" />
    </SmallButton>
    <SmallButton
      main-title="Store the displayed value into a variable"
      @click="pressSto()"
      :upper-space="false"
      color="gray"
      :on-pressed="store.onSto"
      ><span class="font-bold text-sm tall:text-[17px]">STO</span></SmallButton
    >
    <SmallButton
      main-title="Move cursor left"
      @click="$emit('keystroke', 'Left')"
      :upper-space="false"
      color="gray"
      ><i class="pi pi-arrow-left"></i>
    </SmallButton>
    <SmallButton
      main-title="Move cursor right"
      @click="$emit('keystroke', 'Right')"
      :upper-space="false"
      color="gray"
    >
      <i class="pi pi-arrow-right"></i>
    </SmallButton>
    <SmallButton
      main-title="Left parenthesis"
      @click="$emit('typedText', '(')"
      :upper-space="false"
      color="gray"
    >
      (
    </SmallButton>
    <SmallButton
      main-title="Right parenthesis"
      @click="$emit('typedText', ')')"
      :upper-space="false"
      color="gray"
    >
      )
    </SmallButton>

    <!-- Second row -->
    <SmallButton
      main-title="Fraction"
      @click="$emit('typedText', '/')"
      center-title="Modulo"
    >
      <template v-slot:center>mod</template>
      <math display="inline" class="text-[15px] tall:text-[22px]">
        <mfrac>
          <mi class="relative -bottom-[2px] tall:-bottom-[3px]">▭</mi>
          <mi class="relative -top-[3px] tall:-top-[5px]">▭</mi>
        </mfrac>
      </math>
    </SmallButton>
    <SmallButton
      main-title="Differentiate"
      @click="store.onShift ? $emit('cmd', '\\diffat') : $emit('cmd', '\\diff')"
      center-title="Differentiate and evaluate at given x"
    >
      <template v-slot:center>
        <math
          display="inline"
          class="relative tall:-top-[2px] text-[10px] tall:text-[13px]"
        >
          <msub>
            <mrow>
              <!-- <mo>[</mo> -->
              <mfrac bevelled="true">
                <mi class="relative -bottom-[2px] tall:-bottom-[2px]">d</mi>
                <mrow class="relative -top-[3px] tall:-top-[2px]">
                  <mi>d</mi><mi>x</mi>
                </mrow>
              </mfrac>
              <mi>▭</mi>
              <mi class="text-xs tall:text-lg">|</mi>
            </mrow>
            <mrow
              class="relative -top-[3px] tall:-top-[5px] text-[6px] tall:text-[8px]"
              ><mi>x</mi><mn>=</mn><mi>▯</mi>
            </mrow>
          </msub>
        </math>
      </template>
      <span>d/dx</span>
    </SmallButton>
    <SmallButton
      main-title="Integrate"
      @click="store.onShift ? $emit('cmd', '\\defint') : $emit('cmd', '\\int')"
      center-title="Integrate with given limits"
    >
      <template v-slot:center>
        <math display="inline" class="text-[10px] tall:text-[12px]">
          <mrow>
            <msubsup>
              <mo>&int;</mo>
              <mn>□</mn>
              <mn>□</mn>
            </msubsup>
            <mi>▭</mi>
          </mrow>
        </math>
      </template>
      <span class="text-[14px] tall:text-[20px] relative bottom-[2px]">∫</span>
    </SmallButton>
    <SmallButton
      main-title="Sum"
      @click="store.onShift ? $emit('cmd', '\\prod') : $emit('cmd', '\\sum')"
      center-title="Product"
    >
      <template v-slot:center> Π </template>
      <span class="relative bottom-[3px]">∑</span>
    </SmallButton>
    <SmallButton
      main-title="Infinity"
      @click="store.onShift ? $emit('cmd', '\\lim') : $emit('typedText', '∞')"
      center-title="Limit of a function"
    >
      <template v-slot:center> lim </template>
      <span class="text-[17px] tall:text-[23px] relative bottom-[2px]">∞</span>
    </SmallButton>
    <SmallButton
      center-title="Factor an expression"
      main-title="Variable x"
      @click="
        store.onShift
          ? $emit('typedText', 'x')
          : store.onSto
          ? $emit('store', 'x')
          : $emit('cmd', '\\factor')
      "
    >
      <template v-slot:center> factor </template>
      <span class="text-[17px] tall:text-[23px] relative bottom-[2px]">x</span>
    </SmallButton>

    <!-- 3rd row -->
    <SmallButton
      main-title="Sine"
      @click="
        store.onShift
          ? $emit('typedText', 'arcsin(')
          : $emit('typedText', 'sin(')
      "
      center-title="Inverse sine"
    >
      <template v-slot:center> sin<sup>-1</sup> </template>
      sin
    </SmallButton>
    <SmallButton
      main-title="Cosine"
      @click="
        store.onShift
          ? $emit('typedText', 'arccos(')
          : $emit('typedText', 'cos(')
      "
      center-title="Inverse cosine"
    >
      <template v-slot:center> cos<sup>-1</sup> </template>
      cos
    </SmallButton>
    <SmallButton
      main-title="Tangent"
      @click="
        store.onShift
          ? $emit('typedText', 'arctan(')
          : $emit('typedText', 'tan(')
      "
      center-title="Inverse tangent"
    >
      <template v-slot:center> tan<sup>-1</sup></template>
      tan
    </SmallButton>
    <SmallButton
      main-title="Hyperbolic sine"
      @click="
        store.onShift
          ? $emit('typedText', 'arcsinh(')
          : $emit('typedText', 'sinh(')
      "
      center-title="Inverse hyperbolic sine"
    >
      <template v-slot:center> sinh<sup>-1</sup></template>
      sinh
    </SmallButton>
    <SmallButton
      main-title="Hyperbolic cosine"
      center-title="Inverse hyperbolic cosine"
      @click="
        store.onShift
          ? $emit('typedText', 'arccosh(')
          : $emit('typedText', 'cosh(')
      "
    >
      <template v-slot:center> cosh<sup>-1</sup></template>
      cosh
    </SmallButton>
    <SmallButton
      center-title="Inverse hyperbolic tangent"
      main-title="Hyperbolic tangent"
      @click="
        store.onShift
          ? $emit('typedText', 'arctanh(')
          : $emit('typedText', 'tanh(')
      "
    >
      <template v-slot:center> tanh<sup>-1</sup></template>
      tanh
    </SmallButton>

    <!-- 4th row -->
    <SmallButton
      center-title="Scientific constants"
      main-title="Pi"
      @click="store.onShift ? $emit('cmd', 'const') : $emit('typedText', 'pi')"
    >
      <template v-slot:center
        ><span class="uppercase text-[13px] font-bold">const</span></template
      >
      <span class="text-[17px] tall:text-[23px] relative bottom-[2px]">π</span>
    </SmallButton>
    <SmallButton
      center-title="SI (metric) prefixes"
      main-title="Percentage"
      @click="store.onShift ? $emit('cmd', 'const') : $emit('typedText', '%')"
    >
      <template v-slot:center
        ><span class="uppercase text-[13px] font-bold">SI</span></template
      >
      %
    </SmallButton>
    <SmallButton
      center-title="Argument of complex number"
      main-title="Percentage"
      @click="
        store.onShift ? $emit('typedText', 'arg(') : $emit('typedText', 'i')
      "
    >
      <template v-slot:center>arg</template>
      <span class="font-serif">i</span>
    </SmallButton>
    <SmallButton
      center-title="Exponential"
      main-title="Natural (Euler's) number"
      @click="
        store.onShift ? $emit('typedText', 'e^') : $emit('typedText', 'e')
      "
    >
      <template v-slot:center>
        <span class="font-serif">e</span><sup>▭</sup>
      </template>
      <span class="font-serif">e</span>
    </SmallButton>
    <SmallButton
      center-title="Power of 10"
      main-title="Logarithm with base 10"
      @click="
        store.onShift ? $emit('typedText', '10^') : $emit('typedText', 'log(')
      "
    >
      <template v-slot:center> 10<sup>▭</sup></template>
      log
    </SmallButton>
    <SmallButton
      center-title="Logarithm with specified base"
      main-title="Natural logarithm"
      @click="
        store.onShift ? $emit('cmd', '\\logbase') : $emit('typedText', 'ln(')
      "
    >
      <template v-slot:center> log<sub>▭</sub>▯</template>
      ln
    </SmallButton>
    <SmallButton
      center-title="Equals sign for inputting equation"
      main-title="Absolute"
      @click="store.onShift ? pressSto() : $emit('typedText', '|')"
    >
      <template v-slot:center>=</template>
      <span class="text-[14px] relative bottom-[2px] tall:text-[20px]"
        >|▭|</span
      >
    </SmallButton>
    <SmallButton
      center-title="Variable A"
      main-title="Square"
      @click="
        store.onShift
          ? $emit('cmd', '\\text{A}')
          : store.onSto
          ? $emit('store', 'A')
          : $emit('typedText', '^2')
      "
      :is-variable="true"
    >
      <template v-slot:center>A</template>
      <span class="text-[14px] relative bottom-[2px] tall:text-[20px]"
        >x<sup>2</sup></span
      >
    </SmallButton>
    <SmallButton
      center-title="Variable B"
      main-title="Square"
      @click="
        store.onShift
          ? $emit('cmd', '\\text{B}')
          : store.onSto
          ? $emit('store', 'B')
          : $emit('typedText', '^')
      "
      :is-variable="true"
    >
      <template v-slot:center>B</template>
      <span class="text-[14px] relative bottom-[2px] tall:text-[20px]"
        >x<sup>□</sup></span
      >
    </SmallButton>
    <SmallButton
      center-title="Variable C"
      main-title="Square"
      @click="
        store.onShift
          ? $emit('cmd', '\\text{C}')
          : store.onSto
          ? $emit('store', 'C')
          : $emit('typedText', 'sqrt')
      "
      :is-variable="true"
    >
      <template v-slot:center>C</template>
      <math display="block">
        <msqrt>
          <mi>□</mi>
        </msqrt>
      </math>
    </SmallButton>
    <SmallButton
      center-title="Variable D"
      main-title="Root"
      @click="
        store.onShift
          ? $emit('cmd', '\\text{D}')
          : store.onSto
          ? $emit('store', 'D')
          : $emit('typedText', 'sqrt')
      "
      :is-variable="true"
    >
      <template v-slot:center>D</template>
      <math display="block">
        <mroot>
          <mn>□</mn>
          <mn>□</mn>
        </mroot>
      </math>
    </SmallButton>
    <SmallButton
      center-title="n chooses r: combinations for selecting r items from n items"
      main-title="Factorial"
      @click="
        store.onShift ? $emit('typedText', 'choose') : $emit('typedText', '!')
      "
    >
      <template v-slot:center>nCr</template>
      <span class="text-[14px] relative bottom-[2px] tall:text-[20px]">x!</span>
    </SmallButton>
  </div>
</template>
