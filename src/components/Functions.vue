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

function openConst() {
  const overlay = HSOverlay.getInstance(
    '[data-hs-overlay="#physical-constants"]',
    true
  );
  const combobox = HSComboBox.getInstance(
    "#physical-constants [data-hs-combo-box]",
    true
  );
  if (overlay.element && overlay.element.overlay.classList.contains("open"))
    return false;
  overlay.element.open();
  combobox.element.setCurrent();
}

function openSI() {
  const overlay = HSOverlay.getInstance('[data-hs-overlay="#prefixes"]', true);
  const combobox = HSComboBox.getInstance(
    "#prefixes [data-hs-combo-box]",
    true
  );
  if (overlay.element && overlay.element.overlay.classList.contains("open"))
    return false;
  overlay.element.open();
  combobox.element.setCurrent();
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
      @btndown="pressShift"
      :upper-space="false"
      color="gray"
      :on-pressed="store.onShift"
    >
      <KeyboardShiftSolid v-if="store.onShift" class="h-5 tall:h-[25px]" />
      <KeyboardShift v-else class="h-5 tall:h-[25px]" />
    </SmallButton>
    <SmallButton
      main-title="Store the displayed value into a variable"
      @btndown="pressSto()"
      :upper-space="false"
      color="gray"
      :on-pressed="store.onSto"
      ><span class="rubik-font text-xs tall:text-[16px]">STO</span></SmallButton
    >
    <SmallButton
      main-title="Move cursor left"
      @btndown="$emit('keystroke', 'Left')"
      :upper-space="false"
      color="gray"
      ><i class="pi pi-arrow-left"></i>
    </SmallButton>
    <SmallButton
      main-title="Move cursor right"
      @btndown="$emit('keystroke', 'Right')"
      :upper-space="false"
      color="gray"
    >
      <i class="pi pi-arrow-right"></i>
    </SmallButton>
    <SmallButton
      main-title="Physical constants"
      :upper-space="false"
      color="gray"
      @btndown="openConst()"
    >
      <span class="rubik-font text-xs tall:text-[16px]">CONST</span>
    </SmallButton>
    <SmallButton
      main-title="SI (metric) prefixes"
      :upper-space="false"
      color="gray"
      @btndown="openSI()"
    >
      <span class="rubik-font text-xs tall:text-[16px]">SI</span>
    </SmallButton>

    <!-- Second row -->
    <SmallButton
      center-title="Modulo"
      main-title="Fraction"
      @btndown="
        store.onShift ? $emit('typedText', '=') : $emit('typedText', '/')
      "
    >
      <template v-slot:center>=</template>
      <math display="inline" class="text-[15px] tall:text-[22px]">
        <mfrac>
          <mi class="relative -bottom-[2px] tall:-bottom-[3px]">▭</mi>
          <mi class="relative -top-[3px] tall:-top-[5px]">▭</mi>
        </mfrac>
      </math>
    </SmallButton>
    <SmallButton
      center-title="Differentiate and evaluate at given x"
      main-title="Differentiate"
      @btndown="
        store.onShift ? $emit('cmd', '\\diffat') : $emit('cmd', '\\diff')
      "
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
      @btndown="
        store.onShift ? $emit('cmd', '\\defint') : $emit('cmd', '\\int')
      "
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
      @btndown="store.onShift ? $emit('cmd', '\\prod') : $emit('cmd', '\\sum')"
      center-title="Product"
    >
      <template v-slot:center> Π </template>
      <span class="relative bottom-[3px]">∑</span>
    </SmallButton>
    <SmallButton
      main-title="Infinity"
      @btndown="store.onShift ? $emit('cmd', '\\lim') : $emit('typedText', '∞')"
      center-title="Limit of a function"
    >
      <template v-slot:center> lim </template>
      <span class="text-[17px] tall:text-[23px] relative bottom-[2px]">∞</span>
    </SmallButton>
    <SmallButton
      center-title="Factor an expression"
      main-title="Variable x"
      @btndown="
        store.onShift
          ? $emit('typedText', '\\factor(')
          : $emit('typedText', 'x')
      "
    >
      <template v-slot:center> factor </template>
      <span class="text-[17px] tall:text-[23px] relative bottom-[2px]">x</span>
    </SmallButton>

    <!-- 3rd row -->
    <SmallButton
      main-title="Sine"
      @btndown="
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
      @btndown="
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
      @btndown="
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
      @btndown="
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
      @btndown="
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
      @btndown="
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
      center-title="Square"
      main-title="Power"
      @btndown="
        store.onShift ? $emit('typedText', '^2') : $emit('typedText', '^')
      "
    >
      <template v-slot:center> x<sup>2</sup></template>
      <span class="text-[14px] relative bottom-[2px] tall:text-[20px]"
        >x<sup>□</sup></span
      >
    </SmallButton>
    <SmallButton
      center-title="Nth root"
      main-title="Square root"
      @btndown="
        store.onShift
          ? $emit('typedText', 'nthroot')
          : $emit('typedText', 'sqrt')
      "
    >
      <template v-slot:center>
        <math display="block">
          <mroot>
            <mn>□</mn>
            <mn>□</mn>
          </mroot>
        </math>
      </template>
      <math display="block">
        <msqrt>
          <mn>□</mn>
        </msqrt>
      </math>
    </SmallButton>
    <SmallButton
      center-title="Argument of complex number"
      main-title="Percentage"
      @btndown="
        store.onShift ? $emit('typedText', 'arg(') : $emit('typedText', 'i')
      "
    >
      <template v-slot:center>arg</template>
      <span class="font-serif">i</span>
    </SmallButton>
    <SmallButton
      center-title="Exponential"
      main-title="Natural (Euler's) number"
      @btndown="
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
      @btndown="
        store.onShift ? $emit('typedText', '10^') : $emit('typedText', 'log(')
      "
    >
      <template v-slot:center> 10<sup>▭</sup></template>
      log
    </SmallButton>
    <SmallButton
      center-title="Logarithm with specified base"
      main-title="Natural logarithm"
      @btndown="
        store.onShift ? $emit('cmd', '\\logbase') : $emit('typedText', 'ln(')
      "
    >
      <template v-slot:center> log<sub>▭</sub>▯</template>
      ln
    </SmallButton>
    <SmallButton
      center-title="Equals sign for inputting equation"
      main-title="Absolute"
      @btndown="
        store.onShift ? $emit('typedText', '=') : $emit('typedText', '|')
      "
    >
      <template v-slot:center></template>
      <span class="text-[14px] relative bottom-[2px] tall:text-[20px]"
        >|▭|</span
      >
    </SmallButton>
    <SmallButton
      center-title="Variable A"
      main-title="Pi"
      @btndown="
        store.onShift
          ? $emit('cmd', '\\text{A}')
          : store.onSto
          ? $emit('store', 'A')
          : $emit('typedText', 'pi')
      "
      :is-variable="true"
    >
      <template v-slot:center>A</template>
      <span class="text-[17px] tall:text-[23px] relative bottom-[2px]">π</span>
    </SmallButton>
    <SmallButton
      center-title="Variable B"
      main-title="Left parenthesis"
      @btndown="
        store.onShift
          ? $emit('cmd', '\\text{B}')
          : store.onSto
          ? $emit('store', 'B')
          : $emit('typedText', '(')
      "
      :is-variable="true"
    >
      <template v-slot:center>B</template>
      (
    </SmallButton>
    <SmallButton
      center-title="Variable C"
      main-title="Right parenthesis"
      @btndown="
        store.onShift
          ? $emit('cmd', '\\text{C}')
          : store.onSto
          ? $emit('store', 'C')
          : $emit('typedText', ')')
      "
      :is-variable="true"
    >
      <template v-slot:center>C</template>
      )
    </SmallButton>
    <SmallButton
      center-title="Variable D"
      main-title="Percentage"
      @btndown="
        store.onShift
          ? $emit('cmd', '\\text{D}')
          : store.onSto
          ? $emit('store', 'D')
          : $emit('typedText', '%')
      "
      :is-variable="true"
    >
      <template v-slot:center>D</template>
      %
    </SmallButton>
    <SmallButton
      center-title="n chooses r: combinations for selecting r items from n items"
      main-title="Factorial"
      @btndown="
        store.onShift ? $emit('typedText', 'binom') : $emit('typedText', '!')
      "
    >
      <template v-slot:center>nCr</template>
      <span class="text-[14px] relative bottom-[2px] tall:text-[20px]">x!</span>
    </SmallButton>
  </div>
</template>
<style>
.rubik-font {
  font-family: "Rubik", sans-serif;
  font-optical-sizing: auto;
  font-weight: 500;
  font-style: normal;
}
</style>
