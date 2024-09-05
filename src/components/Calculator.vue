<script setup>
import { onMounted, ref, computed, reactive } from "vue";
import NumberPad from "./NumberPad.vue";
import Functions from "./Functions.vue";
import { store, resetShiftAlpha } from "./store";

import Simplebar from "simplebar-vue";
import "simplebar-vue/dist/simplebar.min.css";
import constants from "../assets/constants.json";

const MQ = MathQuill.getInterface(2);

const mathFieldEl = ref(null);
const answerFieldEl = ref(null);
const mathFieldRef = computed(() => MQ.MathField(mathFieldEl.value));
const staticMathRef = computed(() => MQ.StaticMath(answerFieldEl.value));

const data = reactive({
  calculated: null,
  isRational: false,
  SD: true,
  mixedFraction: false,
  solveMode: false,
  id: 0,
  focus: true,
});

const latexFunctionMap = [
  { latex: "\\\\cdot", exp: "*" },
  { latex: "\\\\%", exp: "%" },

  { latex: "\\\\sin", exp: "sin" },
  { latex: "\\\\cos", exp: "cos" },
  { latex: "\\\\tan", exp: "tan" },
  { latex: "\\\\arcsin", exp: "asin" },
  { latex: "\\\\arccos", exp: "acos" },
  { latex: "\\\\arctan", exp: "atan" },
  { latex: "\\\\operatorname\\{arcsinh\\}", exp: "asinh" },
  { latex: "\\\\operatorname\\{arccosh\\}", exp: "acosh" },
  { latex: "\\\\operatorname\\{arctanh\\}", exp: "atanh" },

  { latex: "\\\\arg", exp: "arg" },
  { latex: "\\\\text\\{factor\\}", exp: "factor" },

  { latex: "\\\\log\\\\left\\(", exp: "log10(" },
  { latex: "\\\\ln\\\\left\\(", exp: "log(" },

  { latex: "\\\\left\\(", exp: "(" },
  { latex: "\\\\right\\)", exp: ")" },

  { latex: "\\infty", exp: "∞" },

  { latex: "\\{", exp: "(" },
  { latex: "\\}", exp: ")" },
];

function preprocessInputLatex(latex) {
  // deal with ^: convert e^2x to e^(2)x
  latex = latex.replace(/(\^)(\d)/, "$1($2)");

  // deal with abs
  latex = latex.replace(/\\left\|(.*?)\\right\|/g, "abs($1)");

  // deal with log of base n
  latex = latex.replace(
    /\\log_(.*?)\\left\[(.*?)\\right\]/g,
    "log($2)/log($1)"
  );

  // deal with ncr
  latex = latex.replace(/\\binom\{(.*?)\}\{(.*?)\}/g, "$1!/(($1-$2)!*$2!)");

  // deal with sum
  latex = latex.replace(
    /\\sum_\{(\w+)=(.*?)\}\^\{(.*?)\}(.*?)$/g,
    "sum($4,$1,$2,$3)"
  );

  // deal with prod
  latex = latex.replace(
    /\\prod_\{(\w+)=(.*?)\}\^\{(.*?)\}(.*?)$/g,
    "product($4,$1,$2,$3)"
  );

  // deal with indefinite/definite integrals
  latex = latex.replace(
    /\\int\\left\[(.*?)\\right\]d(\w+)/g,
    "integrate($1,$2)"
  );
  latex = latex.replace(
    /\\defint_\{(.*?)\}\^\{(.*?)\}\\left\[(.*?)\\right\]d(\w+)/g,
    "defint($3,$1,$2,$4)"
  );

  // differentiation
  latex = latex.replace(
    /\\frac\{d\}\{d(\w+)\}\\left\[(.*?)\\right\]_\{(.*?)\}/g,
    "diffat($2, $1, $3)"
  );
  latex = latex.replace(
    /\\frac\{d\}\{d(\w+)\}\\left\[(.*?)\\right\]/g,
    "diff($2, $1)"
  );

  // constants
  constants.forEach((item) => {
    const regex = new RegExp(`\\\\mathrm\\{\\\\ ${item.latex}\\}`, "g");
    latex = latex.replace(regex, "const_" + item.constant);
  });

  // add a 0 in front of a dot (.) if the dot isn't preceded by a number
  latex = latex.replace(/(?<!\d)\./g, "0.");

  // deal with sqrt, root of n
  latex = latex.replace(/\\sqrt\{(.*?)\}/g, function (_, base) {
    return `sqrt(${base})`;
  });

  latex = latex.replace(/\\sqrt\[(.*?)\]\{(.*?)\}/g, function (_, root, base) {
    return `(${base})^(1/(${root}))`;
  });

  // deal with fractions
  function replaceFractions(str) {
    // Regular expression to match \frac{numerator}{denominator}
    const fracRegex = /\\frac{([^{}]+)}{([^{}]+)}/;
    // Recursively replace all occurrences of \frac{a}{b}
    while (fracRegex.test(str)) {
      // Replace one occurrence of \frac{a}{b} with (a)/(b)
      str = str.replace(fracRegex, (match, numerator, denominator) => {
        return `(${replaceFractions(numerator)})/(${replaceFractions(
          denominator
        )})`;
      });
    }
    return str;
  }
  latex = replaceFractions(latex);

  // functions
  latexFunctionMap.forEach((item) => {
    const regex = new RegExp(`${item.latex}`, "g");
    latex = latex.replace(regex, item.exp);
  });
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
    const exp = preprocessInputLatex(mathField.latex());
    console.log({ latex: mathField.latex() });
    console.log({ exp: exp });
    // evaluate mode
    if (!exp.includes("=")) {
      data.calculated =
        exp.includes("factor") || exp.includes("diffat")
          ? nerdamer(exp)
          : nerdamer(exp, {}, ["expand"]);
      // solve mode
    } else {
      data.calculated = nerdamer(`solve(${exp}, x)`);
      data.solveMode = true;
    }
    const answer = displayAnswer();
    return answer;
  }
}
onMounted(() => {
  const localStorageHistory = localStorage.getItem("calcHistory");
  store.history = localStorageHistory ? JSON.parse(localStorageHistory) : [];

  const localStorageVariables = localStorage.getItem("calcVariables");
  store.variables = localStorageVariables
    ? JSON.parse(localStorageVariables)
    : {};

  for (const [key, value] of Object.entries(store.variables)) {
    nerdamer.setVar(key, nerdamer.convertFromLaTeX(value));
  }

  const config = {
    autoCommands:
      "pi sqrt sum nthroot choose mu epsilon gamma alpha sigma phi infinity lambda",
    sumStartsWithNEquals: false,
    handlers: {
      edit: function () {
        const staticMath = staticMathRef.value;
        staticMath.latex("");
        data.calculated = null;
        data.SD = true;
        data.mixedFraction = false;
        data.solveMode = false;
      },
      enter: calculateInput,
    },
  };

  mathFieldRef.value.config(config);
  mathFieldRef.value.focus();

  constants.forEach((item) => {
    nerdamer.setConstant("const_" + item.constant, item.value);
  });

  function diffAt(exp_, x_, value_) {
    const exp = exp_.clone();
    const x = x_.clone();
    const value = value_.clone();
    const core = nerdamer.getCore();
    return nerdamer(core.Calculus.diff(exp, x).sub(x, value)).evaluate();
  }

  nerdamer.register({
    name: "diffat",
    visible: true,
    numargs: 3,
    build: function () {
      return diffAt;
    },
  });
});

function displayNumeric(number) {
  // display format for complex and scientific notation from fractions
  const realPartFraction = nerdamer(`realpart(${number})`).toString();
  const imagPartFraction = nerdamer(`imagpart(${number})`).toString();

  function convertToDecimals(fractionString) {
    // convert 1.2488e-20 to 1.2488 \\cdot 10^{-20}
    const decimalNumber = eval?.(`"use strict";(${fractionString})`).toString();

    if (decimalNumber.includes("e")) {
      const [coeff, expon] = decimalNumber.split("e");
      const latex = `${coeff} \\cdot 10^{${expon}}`;
      return latex;
    } else {
      return decimalNumber;
    }
  }

  let latexReal, latexImag;
  if (realPartFraction == "0") {
    latexReal = "";
  } else {
    const realPartDecimal = convertToDecimals(realPartFraction);
    latexReal = `${realPartDecimal}`;
  }

  if (imagPartFraction == "0") {
    latexImag = "";
  } else {
    const imagPartDecimal = convertToDecimals(imagPartFraction);
    latexImag = `${imagPartDecimal.includes("-") ? "" : "+"} ${
      imagPartDecimal == "1" ? "" : imagPartDecimal
    }i`;
  }

  const latex = latexReal + latexImag;

  if (latex === "") {
    return "0";
  } else {
    if (latex.startsWith("+")) {
      return latex.slice(1);
    } else {
      return latex;
    }
  }
}

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

function displayNumericSolutions(solutions) {
  const solutionsArray = trim(solutions).split(",");
  return solutionsArray.map(displayNumeric);
}

function displayAnswer() {
  let answer = "";
  const mustSimplify = /sin|cos|tan|csc|sec|cot|factorial|log/.test(
    data.calculated.toString()
  );
  const isEvaluable = /^[0-9+\-/i\[\]\(\),*]*$/.test(
    data.calculated.evaluate().text("fractions")
  );

  // evaluate expression
  if (!data.solveMode) {
    answer = `= ${
      (data.SD || mustSimplify) && isEvaluable
        ? displayNumeric(data.calculated.evaluate().text("fractions"))
        : preprocessDisplayLatex(data.calculated.toTeX())
    }`;
    // solve mode
  } else {
    answer = `x = ${
      (data.SD || mustSimplify) && isEvaluable
        ? displayNumericSolutions(data.calculated.evaluate().text("fractions"))
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
        displayAnswer();
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
    case "\\int":
      mathField.write("\\int\\left[\\right] dx");
      for (let i = 0; i < 3; i++) {
        mathField.keystroke("Left");
      }
      mathField.focus();
      break;
    case "\\defint":
      mathField.write("\\defint_{ }^{ }\\left[\\right] dx");
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
    case "\\prod":
      mathField.write("\\prod_{x=}^{ }");
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
    localStorage.setItem("calcVariables", JSON.stringify(store.variables));
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
