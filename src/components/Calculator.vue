<script setup>
import { onMounted, ref, computed, reactive } from "vue";
import nerdamer from "nerdamer-prime/all.min.js";
import NumberPad from "./NumberPad.vue";
import Functions from "./Functions.vue";
import { store, resetShiftAlpha } from "./store";

import Simplebar from "simplebar-vue";
import "simplebar-vue/dist/simplebar.min.css";

const MQ = MathQuill.getInterface(2);

const mathFieldEl = ref(null);
const answerFieldEl = ref(null);
const mathFieldRef = computed(() => MQ.MathField(mathFieldEl.value));
const staticMathRef = computed(() => MQ.StaticMath(answerFieldEl.value));

const data = reactive({
  calculated: null,
  isRational: false,
  SD: false,
  mixedFraction: false,
  solveMode: false,
});

function preprocessInputLatex(latex) {
  // convert //cdot to *
  latex = latex.replace(/\\cdot/g, " \\cdot ");
  // convert \\operatorname{arccsc} to \\mathrm{acsc}
  latex = latex.replace(/\\operatorname{arccsc}/g, "\\mathrm{acsc}");
  latex = latex.replace(/\\operatorname{arcsec}/g, "\\mathrm{asec}");
  latex = latex.replace(/\\operatorname{arccot}/g, "\\mathrm{acot}");

  // deal with npr, ncr
  latex = latex.replace(
    /\\text{nCr}\\left\((\d+),(\d+)\\right\)/g,
    "\\frac{$1!}{($1-$2)!*$2!}"
  );
  latex = latex.replace(
    /\\text{nPr}\\left\((\d+),(\d+)\\right\)/g,
    "\\frac{$1!}{($1-$2)!}"
  );

  // deal with abs
  latex = latex.replace(/\\left\|(.*?)\\right\|/g, "abs($1)");

  // deal with integrals
  latex = latex.replace(
    /\\int_\{(\d+)\}\^\{(\d+)\}\\left\[(.*?)\\right\]\\mathrm{d}x/g,
    "defint($3,$1,$2)"
  );
  latex = latex.replace(
    /\\int_\{(\s+)\}\^\{(\s+)\}\\left\[(.*?)\\right\]\\mathrm{d}x/g,
    "integrate($3, x)"
  );

  // differentiation
  latex = latex.replace(
    /\\frac\{d\}\{dx\}\\left\[(.*?)\\right\]/g,
    "diff($1, x)"
  );

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
  console.log({ latex: mathField.latex() });
  if (mathField.latex()) {
    const processedLatex = preprocessInputLatex(mathField.latex());
    console.log(processedLatex);
    const exp = nerdamer.convertFromLaTeX(processedLatex).toString();
    console.log(exp);
    data.calculated = nerdamer(exp, {}, ["expand"]);
    SD(/sin|cos|tan|csc|sec|cot|factorial/.test(data.calculated.toString()));
  }
}
onMounted(() => {
  const config = {
    autoCommands: "pi sqrt sum",
    sumStartsWithNEquals: false,
    handlers: {
      edit: function () {
        const staticMath = staticMathRef.value;
        staticMath.latex("");
        data.calculated = null;
        data.SD = false;
        data.mixedFraction = false;
        data.solveMode = false;
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
  const numerator = fraction.numerator().toString();
  const denominator = fraction.denominator().toString();
  console.log(numerator);
  console.log(denominator);
  const quotient = Math.floor(numerator / denominator);
  const remainder = numerator % denominator;
  return `${quotient != 0 ? quotient : ""}${
    remainder != 0 ? `\\frac{${remainder}}{${denominator}}` : ""
  }`;
}

function trim(x) {
  return x.substring(1, x.length - 1);
}

function SD(condition) {
  if (!data.solveMode) {
    staticMathRef.value.latex(
      `= ${
        condition
          ? data.calculated.evaluate().text("decimals")
          : preprocessDisplayLatex(data.calculated.toTeX())
      }`
    );
    console.log("false");
  } else {
    console.log(trim(data.calculated.toTeX()));
    staticMathRef.value.latex(
      `x = ${
        condition
          ? trim(data.calculated.evaluate().text("decimals"))
          : preprocessDisplayLatex(trim(data.calculated.toTeX()))
      }`
    );
  }
}

function handleCmd(cmd) {
  const mathField = mathFieldRef.value;
  const staticMath = staticMathRef.value;

  switch (cmd) {
    case "SD":
      if (data.calculated) {
        data.SD = !data.SD;
        SD(data.SD);
      }
      break;
    case "mixedFraction":
      if (data.calculated) {
        data.mixedFraction = !data.mixedFraction;
        staticMath.latex(
          `= ${
            data.mixedFraction
              ? displayMixedFraction(data.calculated)
              : preprocessDisplayLatex(data.calculated.toTeX())
          }`
        );
      }
      break;
    case "solve":
      if (mathField.latex()) {
        const processedLatex = preprocessInputLatex(mathField.latex());
        const exp = nerdamer.convertFromLaTeX(processedLatex).toString();
        data.calculated = nerdamer(`solve(${exp}, x)`);
        // SD(data.calculated.toString());
        console.log({ latex: data.calculated.toString() });
        data.solveMode = true;
        SD(
          /sin|cos|tan|csc|sec|cot|factorial/.test(data.calculated.toString())
        );
      }
      break;
    case "\\int":
      mathField.write("\\int_{ }^{ } \\left[\\right] \\mathrm{d}x");
      for (let i = 0; i < 8; i++) {
        mathField.keystroke("Left");
      }
      break;
    case "\\sum":
      mathField.write("\\sum_{x=}^{ }");
      for (let i = 0; i < 2; i++) {
        mathField.keystroke("Left");
      }
      break;
    case "\\diff":
      mathField.write("\\frac{d}{dx} \\left[\\right]");
      for (let i = 0; i < 1; i++) {
        mathField.keystroke("Left");
      }
      break;
    case "\\npr":
      mathField.write("\\text{nPr}\\left( \\right)");
      for (let i = 0; i < 1; i++) {
        mathField.keystroke("Left");
      }
      break;
    case "\\ncr":
      mathField.write("\\text{nCr}\\left( \\right)");
      for (let i = 0; i < 1; i++) {
        mathField.keystroke("Left");
      }
      break;
    case "\\polar":
      mathField.write("\\left[\\angle\\right]");
      // for (let i = 0; i < 1; i++) {
      //   mathField.keystroke("Left");
      // }
      break;
    default:
      mathField.write(cmd);
  }
  // mathField.focus();
  resetShiftAlpha();
}
</script>
<template>
  <main>
    <div class="max-w-[416px] mx-auto">
      <div id="screen">
        <div class="bg-gray-200 h-5 py-0.5">
          <span
            class="text-gray-200 border-0 py-0.5 px-1 ml-1 rounded text-xs font-bold"
            :class="{ 'bg-gray-500': store.onShift }"
            >SHIFT</span
          >
          <span
            class="text-gray-200 border-0 py-0.5 px-1 ml-1 rounded text-xs font-bold"
            :class="{ 'bg-gray-500': store.onAlpha }"
            >ALPHA</span
          >
        </div>
        <div
          class="w-full px-3 py-5 min-h-20 tall:h-30"
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
      <NumberPad
        @cmd="handleCmd"
        @typedText="handleTypedText"
        @keystroke="handleKeystroke"
      />
    </div>
  </main>
</template>

<style>
abbr {
  text-decoration: none;
}
* {
  box-sizing: border-box;
}
</style>
