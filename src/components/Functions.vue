<script setup>
import SmallButton from "./SmallButton.vue";
import { store, resetShiftAlpha } from "./store";

function pressShift() {
  store.onShift = !store.onShift;
  store.onAlpha = false;
}

function pressAlpha() {
  store.onAlpha = !store.onAlpha;
  store.onShift = false;
}
</script>
<template>
  <div class="grid grid-cols-6 bg-gray-200 gap-1 my-2 w-[416px]">
    <SmallButton @click="pressShift">SHIFT</SmallButton>
    <SmallButton @click="pressAlpha">ALPHA</SmallButton>
    <SmallButton main-title="Go to previous calculation">▲</SmallButton>
    <SmallButton main-title="Go to next calculation">▼</SmallButton>
    <SmallButton>MODE</SmallButton>
    <SmallButton main-title="Settings"><i class="pi pi-cog"></i></SmallButton>
    <SmallButton main-title="Calculate">
      <template v-slot:left>SOLVE</template>
      <template v-slot:right>=</template>
      CALC
    </SmallButton>
    <SmallButton
      main-title="Integrate"
      @click="
        store.onShift
          ? $emit('cmd', '\\diff')
          : store.onAlpha
          ? $emit('typedText', ':')
          : $emit('cmd', '\\int')
      "
      left-title="Differentiate"
    >
      <template v-slot:left
        ><math display="inline" class="text-[12px]">
          <mfrac
            ><mi>d</mi> <mrow><mi>d</mi><mi>x</mi></mrow></mfrac
          ><mi>▬</mi>
        </math></template
      >
      <template v-slot:right>:</template>
      <math>
        <mrow>
          <msubsup>
            <mo>&int;</mo>
            <mn>□</mn>
            <mn>□</mn>
          </msubsup>
          <mi>▬</mi>
        </mrow>
      </math>
    </SmallButton>
    <SmallButton
      main-title="Move cursor left"
      @click="$emit('keystroke', 'Left')"
    >
      <i class="pi pi-arrow-left"></i>
    </SmallButton>
    <SmallButton
      main-title="Move cursor right"
      @click="$emit('keystroke', 'Right')"
    >
      <i class="pi pi-arrow-right"></i>
    </SmallButton>
    <SmallButton
      main-title="Multiplicative inverse"
      @click="
        store.onShift
          ? $emit('typedText', '!')
          : store.onAlpha
          ? resetShiftAlpha()
          : $emit('cmd', '^{-1}')
      "
      :center-upper="true"
      center-title="Factorial"
      class="text-xl"
    >
      <template v-slot:center>
        <math><mi>x</mi><mo>!</mo></math>
      </template>
      <math display="inline"
        ><msup><mi>x</mi><mn>-1</mn></msup></math
      >
    </SmallButton>
    <SmallButton
      main-title="Logarithm with specified base"
      @click="
        store.onShift
          ? $emit('cmd', '\\sum')
          : store.onAlpha
          ? resetShiftAlpha()
          : $emit('typedText', 'log_')
      "
      :center-upper="true"
      center-title="Summation"
    >
      <template v-slot:center>
        <math display="inline">
          <munderover>
            <mo>&sum;</mo>
            <mi>◻</mi>
            <mi>◻</mi>
          </munderover>
          <mi>▬</mi></math
        >
      </template>
      <math display="inline">
        <mrow>
          <msub>
            <mi>log</mi>
            <mi>◼</mi>
          </msub>
          <mi>▯</mi>
        </mrow>
      </math>
    </SmallButton>
    <SmallButton
      main-title="Fraction"
      @click="$emit('typedText', '/')"
      :center-upper="true"
      center-title="Mixed fraction"
    >
      <template v-slot:center>
        <math display="inline" class="align-text-bottom text-xs">
          <mi>▬</mi><mfrac><mi>▭</mi><mi>▭</mi></mfrac>
        </math>
      </template>
      <math display="inline" class="align-text-bottom">
        <mfrac><mi>▬</mi><mi>▭</mi></mfrac>
      </math>
    </SmallButton>
    <SmallButton
      main-title="Square root"
      @click="$emit('typedText', 'sqrt')"
      :center-upper="true"
      center-title="Cube root"
    >
      <template v-slot:center>
        <math display="block">
          <mroot>
            <mn>▮</mn>
            <mn>3</mn>
          </mroot>
        </math>
      </template>
      <math display="block">
        <msqrt>
          <mi>▮</mi>
        </msqrt>
      </math>
    </SmallButton>
    <SmallButton
      main-title="Square"
      @click="
        store.onShift
          ? $emit('typedText', '^3')
          : store.onAlpha
          ? resetShiftAlpha()
          : $emit('typedText', '^2')
      "
      left-title="Cube"
    >
      <template v-slot:left>
        <math display="inline">
          <msup><mi>x</mi><mn>3</mn></msup>
        </math>
      </template>
      <math display="inline" class="text-xl">
        <msup><mi>x</mi><mn>2</mn></msup>
      </math>
    </SmallButton>
    <SmallButton
      main-title="Power"
      @click="$emit('typedText', '^')"
      left-title="Root"
    >
      <template v-slot:left>
        <math display="block">
          <mroot>
            <mn>▯</mn>
            <mn>■</mn>
          </mroot>
        </math>
      </template>
      <math display="inline" class="text-xl">
        <msup><mi>x</mi><mn>◼</mn></msup>
      </math>
    </SmallButton>
    <SmallButton
      main-title="Logarithm with base 10"
      @click="
        store.onShift
          ? $emit('typedText', '10^')
          : store.onAlpha
          ? resetShiftAlpha()
          : $emit('typedText', 'log(')
      "
      left-title="Power of 10"
      class="text-xl"
    >
      <template v-slot:left>
        <math display="inline">
          <msup><mn>10</mn><mn>◼</mn></msup>
        </math> </template
      >log
    </SmallButton>
    <SmallButton
      main-title="Natural logarithm"
      @click="
        store.onShift
          ? $emit('typedText', 'e^')
          : store.onAlpha
          ? resetShiftAlpha()
          : $emit('typedText', 'ln')
      "
      left-title="Power of e"
      class="text-xl"
    >
      <template v-slot:left>
        <math display="inline">
          <msup><mi>e</mi><mn>◼</mn></msup>
        </math>
      </template>
      ln
    </SmallButton>
    <SmallButton
      main-title="Negative"
      @click="$emit('typedText', '-')"
      class="text-xl"
    >
      <template v-slot:right>A</template>
      (–)
    </SmallButton>
    <SmallButton>
      <template v-slot:right>B</template>
      ° ′ ″
    </SmallButton>
    <SmallButton
      main-title="Hyperbolic functions and additional trigonometric functions"
      @click="
        store.onShift
          ? $emit('typedText', '|')
          : store.onAlpha
          ? resetShiftAlpha()
          : resetShiftAlpha()
      "
      class="text-xl"
    >
      <template v-slot:left>Abs</template>
      <template v-slot:right>C</template>
      hyp
    </SmallButton>
    <SmallButton
      main-title="Sin"
      @click="$emit('typedText', 'sin(')"
      class="text-xl"
    >
      <template v-slot:left>sin<sup>-1</sup></template>
      <template v-slot:right>D</template>
      sin
    </SmallButton>
    <SmallButton
      main-title="Cosin"
      @click="$emit('typedText', 'cos(')"
      class="text-xl"
    >
      <template v-slot:left>cos<sup>-1</sup></template>
      <template v-slot:right>E</template>
      cos
    </SmallButton>
    <SmallButton
      main-title="Tan"
      @click="$emit('typedText', 'tan(')"
      class="text-xl"
    >
      <template v-slot:left>tan<sup>-1</sup></template>
      <template v-slot:right>F</template>
      tan
    </SmallButton>
    <SmallButton :center-upper="true" class="text-xl">
      <template v-slot:center>STO</template>
      RCL
    </SmallButton>
    <SmallButton class="text-xl">
      <template v-slot:right>
        <math><mi>i</mi></math>
      </template>
      ENG
    </SmallButton>
    <SmallButton
      main-title="("
      @click="$emit('typedText', '(')"
      :center-upper="true"
      center-title="Percent"
      class="text-xl"
    >
      <template v-slot:center>%</template>
      (
    </SmallButton>
    <SmallButton
      main-title=")"
      @click="$emit('typedText', ')')"
      class="text-xl"
    >
      <template v-slot:left>,</template>
      <template v-slot:right>X</template>
      )
    </SmallButton>
    <SmallButton
      main-title="Switch been fractions and decimals"
      @click="$emit('cmd', 'SD')"
      class="text-xl"
    >
      <template v-slot:left>
        <math display="inline" class="align-text-bottom text-xs">
          <mi>a</mi><mfrac><mi>b</mi><mi>c</mi></mfrac>
          <mo>⟺</mo>
          <<mfrac><mi>d</mi><mi>c</mi></mfrac>
        </math>
      </template>
      <template v-slot:right>Y</template>
      S⟺D
    </SmallButton>
    <SmallButton class="text-xl">
      <template v-slot:left>M-</template>
      <template v-slot:right>M</template>
      M+</SmallButton
    >
  </div>
</template>
