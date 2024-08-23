<script setup>
import { onMounted, ref, computed, reactive } from "vue";
import "mathquill/build/mathquill.min.js";
import { ComputeEngine } from "https://unpkg.com/@cortex-js/compute-engine?module";
import nerdamer from "nerdamer/all.min.js";
import NumberPad from "./NumberPad.vue";
import Functions from "./Functions.vue";
import { store, resetShiftAlpha } from "./store";

import Simplebar from "simplebar-vue";
import "simplebar-vue/dist/simplebar.min.css";

const MQ = MathQuill.getInterface(2);
const ce = new ComputeEngine();

const mathFieldEl = ref(null);
const answerFieldEl = ref(null);
const mathFieldRef = computed(() => MQ.MathField(mathFieldEl.value));
const staticMathRef = computed(() => MQ.StaticMath(answerFieldEl.value));

const data = reactive({
  calculated: null,
  isRational: false,
  SD: false,
  mixedFraction: false,
});

function preprocessInputLatex(latex) {
  // convert //cdot to *
  latex = latex.replace(/\\cdot/g, " \\cdot ");
  return latex;
}

function preprocessDisplayLatex(latex) {
  // remove //cdot in front of sqrt
  latex = latex.replace(/ \\cdot \\sqrt/g, "\\sqrt");
  return latex;
}

function handleEnter() {
  const mathField = mathFieldRef.value;
  const staticMath = staticMathRef.value;

  const processedLatex = preprocessInputLatex(mathField.latex());
  const exp = nerdamer.convertFromLaTeX(processedLatex).toString();
  data.calculated = nerdamer(exp, {}, ["expand"]);
  staticMath.latex(`= ${preprocessDisplayLatex(data.calculated.toTeX())}`);
}
onMounted(() => {
  const config = {
    autoCommands: "pi sqrt sum int",
    sumStartsWithNEquals: false,
    handlers: {
      edit: function () {
        const staticMath = staticMathRef.value;
        staticMath.latex("");
      },
      enter: handleEnter,
    },
  };

  mathFieldRef.value.config(config);
  mathFieldRef.value.focus();
});

function handleTypedText(character) {
  mathFieldRef.value.typedText(character);
  mathFieldRef.value.focus();
  resetShiftAlpha();
}

function handleKeystroke(keystroke) {
  const mathField = mathFieldRef.value;
  if (keystroke == "Enter") {
    handleEnter();
  } else if (keystroke == "AC") {
    mathField.latex("");
  } else {
    mathField.keystroke(keystroke);
  }
  resetShiftAlpha();
}

function displayMixedFraction(fraction) {
  const numerator = fraction.numerator();
  const denominator = fraction.denominator();
  console.log(numerator);
  console.log(denominator);
  const quotient = Math.floor(numerator / denominator);
  const remainder = numerator % denominator;
  return `${quotient}\\frac{${remainder}}{${denominator}}`;
}

function handleCmd(cmd) {
  const mathField = mathFieldRef.value;
  const staticMath = staticMathRef.value;

  switch (cmd) {
    case "\\int":
      mathField.write("\\int_{ }^{ } \\left(\\right) \\mathrm{d}x");
      break;
    case "\\sum":
      mathField.write("\\sum_{x=}^{ }");
      for (let i = 0; i < 2; i++) {
        mathField.keystroke("Left");
      }
      break;
    case "SD":
      staticMath.latex(
        `= ${
          data.SD
            ? preprocessDisplayLatex(data.calculated.toTeX())
            : data.calculated.evaluate().text("decimals")
        }`
      );
      data.SD = !data.SD;
      break;
    case "\\diff":
      mathField.write("\\frac{d}{dx} \\left(\\right)_{x={ }}");
      for (let i = 0; i < 5; i++) {
        mathField.keystroke("Left");
      }
      break;
    case "mixedFraction":
      staticMath.latex(
        `= ${
          data.mixedFraction
            ? preprocessDisplayLatex(data.calculated.toTeX())
            : displayMixedFraction(data.calculated)
        }`
      );
      data.mixedFraction = !data.mixedFraction;
      break;
    default:
      mathField.write(cmd);
  }
  mathField.focus();
  resetShiftAlpha();
  // if (cmd === "\\int") {
  //   mathField.write("\\int_{ }^{ } \\left(\\right) \\mathrm{d}x");
  // } else if (cmd === "\\sum") {
  //   mathField.write("\\sum_{x=}^{ }");
  // } else if (cmd === "SD") {
  //   if (data.isRational) {
  //     staticMath.latex(
  //       `= ${
  //         data.SD
  //           ? data.calculated.latex.replace(/\\,/g, "")
  //           : data.calculated.value
  //       }`
  //     );
  //     data.SD = !data.SD;
  //   }
  // } else if (){
  //   mathField.write("\\frac{d}{dx} \\left(\\right)_{x={ }}")
  // }
  // else {
  //   mathField.write(cmd);
  // }
  // mathField.focus();
  // resetShiftAlpha();
}
</script>
<template>
  <main class="flex flex-col items-center content-end h-screen">
    <div class="bg-gray-100 w-[416px] mt-5 border-2 border-gray-500">
      <div class="bg-gray-200 h-7">
        <span
          class="text-gray-200 border-0 py-0.5 px-1 ml-0.5 rounded text-xs font-bold"
          :class="{ 'bg-gray-500': store.onShift }"
          >SHIFT</span
        >
        <span
          class="text-gray-200 border-0 py-0.5 px-1 ml-0.5 rounded text-xs font-bold"
          :class="{ 'bg-gray-500': store.onAlpha }"
          >ALPHA</span
        >
      </div>
      <div
        class="w-full px-3 py-5 min-h-20"
        ref="mathFieldEl"
        id="math-field"
      ></div>
        <Simplebar
          class="h-[60px] bg-gray-200 border-solid border-2 text-right leading-[60px] overflow-y-hidden"
        >
          <span ref="answerFieldEl" class="mx-4" id="answer"></span>
        </Simplebar>
    </div>
    <Functions
      @cmd="handleCmd"
      @typedText="handleTypedText"
      @keystroke="handleKeystroke"
    />
    <NumberPad @typedText="handleTypedText" @keystroke="handleKeystroke" />
  </main>
</template>

<style>
abbr {
  text-decoration: none;
}
</style>
<style scoped>
#math-field {
  border-width: 0;
  background: rgba(0, 0, 0, 0);
}
#math-field.mq-editable-field.mq-focused,
#math-field.mq-math-mode .mq-editable-field.mq-focused {
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  border-width: 0;
  /* border-color: white; */
  border-radius: 1px;
}
</style>
