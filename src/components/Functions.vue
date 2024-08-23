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
  <div class="grid grid-cols-6 bg-gray-200 gap-1 my-2">
    <SmallButton @click="pressShift" :upper-space="false"
      ><span class="text-[12px] tall:text-base">SHIFT</span></SmallButton
    >
    <SmallButton @click="pressAlpha" :upper-space="false"
      ><span class="text-[12px] tall:text-base">ALPHA</span></SmallButton
    >
    <SmallButton main-title="Go to previous calculation" :upper-space="false"
      >▲</SmallButton
    >
    <SmallButton main-title="Go to next calculation" :upper-space="false"
      >▼</SmallButton
    >
    <SmallButton :upper-space="false"
      ><span class="text-[12px] tall:text-base">MODE</span></SmallButton
    >
    <SmallButton main-title="Settings" :upper-space="false"
      ><i class="pi pi-cog"></i
    ></SmallButton>
    <SmallButton
      main-title="Calculate"
      @click="
        store.onShift
          ? $emit('cmd', 'solve')
          : store.onAlpha
          ? $emit('typedText', '=')
          : $emit('cmd', 'calc')
      "
    >
      <template v-slot:left>SOLVE</template>
      <template v-slot:right>=</template>
      <span class="text-[12px] tall:text-base">CALC</span>
    </SmallButton>
    <SmallButton
      main-title="Integrate"
      @click="
        store.onShift
          ? $emit('cmd', '\\diff')
          : store.onAlpha
          ? resetShiftAlpha()
          : $emit('cmd', '\\int')
      "
      :center-upper="true"
      center-title="Differentiate"
    >
      <template v-slot:center
        ><math display="inline" class="align-top text-[9px] tall:text-[11px]">
          <mfrac
            ><mi>d</mi> <mrow><mi>d</mi><mi>x</mi></mrow></mfrac
          ><mi>▬</mi>
        </math></template
      >
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
        <math
          display="inline"
          class="align-text-bottom text-[10px] tall:text-xs"
        >
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
      :center-upper="true"
      center-title="Cube"
    >
      <template v-slot:center>
        <math display="inline">
          <msup><mi>x</mi><mn>3</mn></msup>
        </math>
      </template>
      <math display="inline">
        <msup><mi>x</mi><mn>2</mn></msup>
      </math>
    </SmallButton>
    <SmallButton
      main-title="Power"
      @click="$emit('typedText', '^')"
      :center-upper="true"
      center-title="Root"
    >
      <template v-slot:center>
        <math display="block">
          <mroot>
            <mn>▯</mn>
            <mn>■</mn>
          </mroot>
        </math>
      </template>
      <math display="inline">
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
      :center-upper="true"
      center-title="Power of 10"
    >
      <template v-slot:center>
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
          : $emit('typedText', 'ln(')
      "
      :center-upper="true"
      center-title="Power of e"
    >
      <template v-slot:center>
        <math display="inline">
          <msup><mi>e</mi><mn>◼</mn></msup>
        </math>
      </template>
      ln
    </SmallButton>
    <SmallButton
      main-title="Negative"
      @click="
        store.onShift
          ? resetShiftAlpha()
          : store.onAlpha
          ? resetShiftAlpha()
          : $emit('typedText', '-')
      "
      right-title="Variable A"
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
    >
      <template v-slot:left>Abs</template>
      <template v-slot:right>C</template>
      hyp
    </SmallButton>
    <SmallButton
      main-title="Sin"
      @click="
        store.onShift
          ? $emit('typedText', 'arcsin(')
          : store.onAlpha
          ? resetShiftAlpha()
          : $emit('typedText', 'sin(')
      "
    >
      <template v-slot:left>
        <math display="inline"
          ><msup><mo>sin</mo><mn>-1</mn></msup></math
        >
      </template>
      <template v-slot:right>D</template>
      sin
    </SmallButton>
    <SmallButton
      main-title="Cosin"
      @click="
        store.onShift
          ? $emit('typedText', 'arccos(')
          : store.onAlpha
          ? resetShiftAlpha()
          : $emit('typedText', 'cos(')
      "
    >
      <template v-slot:left>
        <math display="inline"
          ><msup><mo>cos</mo><mn>-1</mn></msup></math
        >
      </template>
      <template v-slot:right>E</template>
      cos
    </SmallButton>
    <SmallButton
      main-title="Tan"
      @click="
        store.onShift
          ? $emit('typedText', 'arctan(')
          : store.onAlpha
          ? resetShiftAlpha()
          : $emit('typedText', 'tan(')
      "
    >
      <template v-slot:left
        ><math display="inline"
          ><msup><mo>tan</mo><mn>-1</mn></msup></math
        >
      </template>
      <template v-slot:right>F</template>
      tan
    </SmallButton>
    <SmallButton :center-upper="true">
      <template v-slot:center>STO</template>
      RCL
    </SmallButton>
    <SmallButton
      @click="
        store.onShift
          ? resetShiftAlpha()
          : store.onAlpha
          ? $emit('typedText', 'i')
          : $emit('cmd', 'ENG')
      "
      :center-upper="true"
      center-title="Imaginary unit"
    >
      <template v-slot:center>
        <math><mi>i</mi></math>
      </template>
      ENG
    </SmallButton>
    <SmallButton
      main-title="("
      @click="
        store.onShift
          ? $emit('typedText', '%')
          : store.onAlpha
          ? resetShiftAlpha()
          : $emit('typedText', '(')
      "
      :center-upper="true"
      center-title="Percent"
    >
      <template v-slot:center>%</template>
      (
    </SmallButton>
    <SmallButton
      main-title=")"
      @click="
        store.onShift
          ? $emit('typedText', ',')
          : store.onAlpha
          ? resetShiftAlpha()
          : $emit('typedText', ')')
      "
    >
      <template v-slot:left>,</template>
      <template v-slot:right>X</template>
      )
    </SmallButton>
    <SmallButton
      main-title="Convert between fractions and decimals"
      @click.prevent="
        store.onShift
          ? $emit('cmd', 'mixedFraction')
          : store.onAlpha
          ? resetShiftAlpha()
          : $emit('cmd', 'SD')
      "
    >
      <template v-slot:left>
        <math
          display="inline"
          class="align-text-bottom text-[10px] tall:text-xs"
        >
          <mi>a</mi><mfrac><mi>b</mi><mi>c</mi></mfrac>
          <mo>⟺</mo>
          <<mfrac><mi>d</mi><mi>c</mi></mfrac>
        </math>
      </template>
      <template v-slot:right>Y</template>
      S⟺D
    </SmallButton>
    <SmallButton>
      <template v-slot:left>M-</template>
      <template v-slot:right>M</template>
      M+</SmallButton
    >
  </div>
</template>
