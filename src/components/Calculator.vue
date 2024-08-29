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
  id: 0,
  focus: true,
});

function preprocessInputLatex(latex) {
  // convert //cdot to *
  latex = latex.replace(/\\cdot/g, " \\cdot ");
  // convert \\operatorname{arccsc} to \\mathrm{acsc}
  latex = latex.replace(/\\operatorname{arccsc}/g, "\\mathrm{acsc}");
  latex = latex.replace(/\\operatorname{arcsec}/g, "\\mathrm{asec}");
  latex = latex.replace(/\\operatorname{arccot}/g, "\\mathrm{acot}");

  // deal with log, ln
  latex = latex.replace(/\\ln/g, "log");
  latex = latex.replace(/\\log/g, "log10");

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
    /\\int_\{(\d+)\}\^\{(\d+)\}\\left\[(.*?)\\right\]dx/g,
    "defint($3,$1,$2)"
  );
  latex = latex.replace(
    /\\int_\{(\s+)\}\^\{(\s+)\}\\left\[(.*?)\\right\]dx/g,
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

function saveHistory(answer) {
  store.history.unshift({
    id: data.id++,
    input: mathFieldRef.value.latex(),
    calculated: data.calculated,
    answer: answer,
  });
  localStorage.setItem("calcHistory", JSON.stringify(store.history));
}

function calculateInput() {
  const mathField = mathFieldRef.value;
  if (mathField.latex()) {
    const processedLatex = preprocessInputLatex(mathField.latex());
    console.log(processedLatex);
    const exp = nerdamer.convertFromLaTeX(processedLatex).toString();
    console.log(exp);
    data.calculated = nerdamer(exp, {}, ["expand"]);
    const answer = displayAnswer();
    return answer;
  }
}
onMounted(() => {
  store.history = JSON.parse(localStorage.getItem("calcHistory"));
  const config = {
    autoCommands: "pi sqrt sum nthroot choose",
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
      enter: calculateInput,
    },
  };

  mathFieldRef.value.config(config);
  mathFieldRef.value.focus();
});

function handleTypedText(character) {
  if (data.focus === false) {
    mathFieldRef.value.latex("");
    data.focus = true;
  }
  mathFieldRef.value.typedText(character);
  mathFieldRef.value.focus();
  resetShiftAlpha();
}

function handleKeystroke(keystroke) {
  const mathField = mathFieldRef.value;
  if (keystroke == "Enter") {
    calculateInput();
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
  const quotient = Math.floor(numerator / denominator);
  const remainder = numerator % denominator;
  return `${quotient != 0 ? quotient : ""}${
    remainder != 0 ? `\\frac{${remainder}}{${denominator}}` : ""
  }`;
}

function trim(x) {
  return x.substring(1, x.length - 1);
}

function displayAnswer(displayDecimal = false) {
  let answer = "";
  const mustSimplify = /sin|cos|tan|csc|sec|cot|factorial|log/.test(
    data.calculated.toString()
  );
  // evaluate expression
  if (!data.solveMode) {
    answer = `= ${
      displayDecimal || mustSimplify
        ? data.calculated.evaluate().text("decimals")
        : preprocessDisplayLatex(data.calculated.toTeX())
    }`;
    // solve mode
  } else {
    answer = `x = ${
      displayDecimal || mustSimplify
        ? trim(data.calculated.evaluate().text("decimals"))
        : preprocessDisplayLatex(trim(data.calculated.toTeX()))
    }`;
  }
  staticMathRef.value.latex(answer);
  saveHistory(answer);
  nerdamer.setVar("Ans", data.calculated.toString());
  store.variables = nerdamer.getVars("latex");
  data.focus = false;
  return answer;
}

function handleCmd(cmd) {
  const mathField = mathFieldRef.value;
  const staticMath = staticMathRef.value;

  switch (cmd) {
    case "SD":
      if (data.calculated) {
        data.SD = !data.SD;
        displayAnswer(data.SD);
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
        data.solveMode = true;
        displayAnswer();
      }
      break;
    case "\\int":
      mathField.write("\\int\\left[\\right] dx");
      for (let i = 0; i < 6; i++) {
        mathField.keystroke("Left");
      }
      mathField.focus();
      break;
    case "\\sum":
      mathField.write("\\sum_{x=}^{ }");
      for (let i = 0; i < 2; i++) {
        mathField.keystroke("Left");
      }
      mathField.focus();
      break;
    case "\\diff":
      mathField.write("\\frac{d}{dx} \\left[\\right]");
      for (let i = 0; i < 1; i++) {
        mathField.keystroke("Left");
      }
      mathField.focus();
      break;
    case "\\diffat":
      mathField.write("\\frac{d}{dx} \\left[\\right]_{}");
      for (let i = 0; i < 3; i++) {
        mathField.keystroke("Left");
      }
      mathField.focus();
      break;
    case "\\ncr":
      mathField.write("\\text{nCr}\\left( \\right)");
      for (let i = 0; i < 1; i++) {
        mathField.keystroke("Left");
      }
      mathField.focus();
      break;
    case "\\logbase":
      mathField.write("\\log_{}\\left[\\right]");
      for (let i = 0; i < 3; i++) {
        mathField.keystroke("Left");
      }
      mathField.focus();
      break;

    default:
      mathField.write(cmd);
  }
  // mathField.focus();
  resetShiftAlpha();
}

function storeVar(var_name) {
  store.onSto = false;
  console.log(mathFieldRef.value.latex());
  if (mathFieldRef.value.latex()) {
    const answer = calculateInput();
    nerdamer.setVar(var_name, data.calculated.toString());
    store.variables = nerdamer.getVars("latex");
    mathFieldRef.value.moveToRightEnd();
    mathFieldRef.value.write(`\\rightarrow \\text{${var_name}}`);
    staticMathRef.value.latex(answer);
  }
}
</script>
<template>
  <main>
    <div class="max-w-[416px] min-w-[320px] mx-auto">
      <div id="screen">
        <div class="bg-gray-200 h-[20px]">
          <span
            class="font-sans text-gray-200 border-0 pb-0.5 px-1 ml-1 rounded text-[9px] font-bold align-[1px]"
            :class="{ 'bg-gray-500': store.onShift }"
            >SHIFT</span
          >
          <span
            class="font-sans text-gray-200 border-0 pb-0.5 px-1 ml-1 rounded text-[9px] font-bold align-[1px]"
            :class="{ 'bg-gray-500': store.onAlpha }"
            >ALPHA</span
          >
          <span
            class="font-sans text-gray-200 border-0 pb-0.5 px-1 ml-1 rounded text-[9px] font-bold align-[1px]"
            :class="{ 'text-gray-500': store.onSto }"
            >STO</span
          >
        </div>
        <div
          class="w-full px-3 py-5 min-h-20 tall:h-30"
          ref="mathFieldEl"
          id="math-field"
        ></div>
        <Simplebar class="h-[60px] text-right leading-[60px] overflow-y-hidden">
          <span ref="answerFieldEl" class="mx-4" id="answer"></span>
        </Simplebar>
      </div>
      <Functions
        @cmd="handleCmd"
        @typedText="handleTypedText"
        @keystroke="handleKeystroke"
        @store="storeVar"
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
