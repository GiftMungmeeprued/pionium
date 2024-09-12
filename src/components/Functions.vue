<script setup>
import SmallButton from "./SmallButton.vue";
import { store } from "./store";
import KeyboardShiftSolid from "./shift_key/KeyboardShiftSolid.vue";
import KeyboardShiftSolidUppercase from "./shift_key/KeyboardShiftSolidUppercase.vue";
import KeyboardShift from "./shift_key/KeyboardShift.vue";
import Abs from "./button_icons/Abs.vue";
import Fraction from "./button_icons/Fraction.vue";
import Diff from "./button_icons/Diff.vue";

let unshiftCooldown = false;
function pressShift() {
  if (!unshiftCooldown) {
    if (store.onShift) {
      store.onShift = false;
      store.shiftLock = false;
      store.onSto = false;
    } else {
      store.onShift = true;
      store.onSto = false;
      store.shiftLock = false;
    }
  } else {
    if (!store.shiftLock) {
      store.shiftLock = true;
      store.onShift = true;
    }
  }
  unshiftCooldown = true;
  setTimeout(() => {
    unshiftCooldown = false;
  }, 500);
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

<template>
  <div class="bg-[#E9EAEE] grid grid-cols-6 gap-1 p-1.5 pt-3 grow">
    <!-- First row -->
    <SmallButton
      main-title="Shift key"
      @btndown="pressShift"
      :upper-space="false"
      color="gray"
      :on-pressed="store.onShift"
    >
      <KeyboardShiftSolidUppercase
        v-if="store.shiftLock"
        class="h-5 tall:h-[25px]"
      />
      <KeyboardShiftSolid v-else-if="store.onShift" class="h-5 tall:h-[25px]" />
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
      <Fraction
        :class="`${
          store.onShift || store.onSto
            ? 'relative top-[2px] w-[30px] h-[15px] tall:w-[30px] tall:h-[15px]'
            : 'w-[30px] h-[17px] tall:w-[40px] tall:h-[23px]'
        }`"
      />
    </SmallButton>
    <SmallButton
      center-title="Differentiate and evaluate at given x"
      main-title="Differentiate"
      @btndown="
        store.onShift ? $emit('cmd', '\\diffat') : $emit('cmd', '\\diff')
      "
      ><template v-slot:center>
        <Diff
          :class="`${
            store.onShift || store.onSto
              ? 'w-[32px] h-[17px] tall:w-[40px] tall:h-[20px]'
              : 'relative w-[30px] h-[15px] tall:top-[3px] tall:w-[30px] tall:h-[15px]'
          }`"
        />
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
        <math
          display="inline"
          :class="`${
            store.onShift || store.onSto
              ? 'text-[15px] tall:text-[17px]'
              : 'relative bottom-[2px] text-[10px] tall:text-[12px]'
          }`"
        >
          <mrow>
            <msubsup>
              <mo>&int;</mo>
              <mn>□</mn>
              <mn>□</mn>
            </msubsup>
            <mi>□</mi>
          </mrow>
        </math>
      </template>
      <span
        :class="`${
          store.onShift || store.onSto
            ? 'text-[14px] tall:text-[15px] relative bottom-[2px]'
            : 'text-[14px] tall:text-[20px] relative bottom-[2px]'
        }`"
        >∫</span
      >
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
      center-title="Square root"
      main-title="Square"
      @btndown="store.onShift ? $emit('typedText', 'sqrt') : $emit('cmd', '^2')"
    >
      <template v-slot:center>
        <math display="block">
          <msqrt>
            <mn>□</mn>
          </msqrt>
        </math></template
      >
      a<sup>2</sup>
    </SmallButton>
    <SmallButton
      center-title="Nth root"
      main-title="Power"
      @btndown="
        store.onShift ? $emit('typedText', 'nthroot') : $emit('typedText', '^')
      "
    >
      <template v-slot:center>
        <math display="block">
          <mroot>
            <mn>□</mn>
            <mn>□</mn>
          </mroot>
        </math> </template
      >a<sup>□</sup>
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
        <span class="font-serif">e</span><sup>□</sup>
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
      <template v-slot:center> 10<sup>□</sup></template>
      log
    </SmallButton>
    <SmallButton
      center-title="Logarithm with specified base"
      main-title="Natural logarithm"
      @btndown="
        store.onShift ? $emit('cmd', '\\logbase') : $emit('typedText', 'ln(')
      "
    >
      <template v-slot:center> log<sub>□</sub>□</template>
      ln
    </SmallButton>
    <SmallButton
      center-title="Variable A"
      main-title="Absolute"
      @btndown="
        store.onShift
          ? $emit('cmd', 'A')
          : store.onSto
          ? $emit('store', 'A')
          : $emit('typedText', '|')
      "
      :is-variable="true"
      class="relative"
    >
      <template v-slot:center>A</template>
      <Abs
        :class="`${
          store.onShift || store.onSto
            ? 'relative top-[3px] w-[30px] h-[15px] tall:w-[30px] tall:h-[15px]'
            : 'w-[30px] h-[15px] tall:w-[40px] tall:h-[20px]'
        }`"
      />
    </SmallButton>
    <SmallButton
      center-title="Variable B"
      main-title="Pi"
      @btndown="
        store.onShift
          ? $emit('cmd', 'B')
          : store.onSto
          ? $emit('store', 'B')
          : $emit('typedText', 'pi')
      "
      :is-variable="true"
    >
      <template v-slot:center>B</template>
      π
    </SmallButton>
    <SmallButton
      center-title="Variable C"
      main-title="Left parenthesis"
      @btndown="
        store.onShift
          ? $emit('cmd', 'C')
          : store.onSto
          ? $emit('store', 'C')
          : $emit('typedText', '(')
      "
      :is-variable="true"
    >
      <template v-slot:center>C</template>
      (
    </SmallButton>
    <SmallButton
      center-title="Variable D"
      main-title="Right parenthesis"
      @btndown="
        store.onShift
          ? $emit('cmd', 'D')
          : store.onSto
          ? $emit('store', 'D')
          : $emit('typedText', ')')
      "
      :is-variable="true"
    >
      <template v-slot:center>D</template>
      )
    </SmallButton>
    <SmallButton
      center-title="Variable F"
      main-title="Percentage"
      @btndown="
        store.onShift
          ? $emit('cmd', 'F')
          : store.onSto
          ? $emit('store', 'F')
          : $emit('typedText', '%')
      "
      :is-variable="true"
    >
      <template v-slot:center>F</template>
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
