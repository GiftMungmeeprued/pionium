<script setup>
import { onMounted, ref, computed, reactive } from "vue";
import NumberPad from "./NumberPad.vue";
import Functions from "./Functions.vue";
import { store, resetShiftAlpha } from "./store";

import Simplebar from "simplebar-vue";
import "simplebar-vue/dist/simplebar.min.css";
import constants from "../assets/constants.json";
import prefixes from "../assets/prefixes.json";

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
  { latex: "\\\\pi", exp: "pi " },
];

function preprocessInputLatex(latex) {
  //////// Simple substitution : no nesting of {} ////////
  // constants
  constants.forEach((item) => {
    const regex = new RegExp(`\\\\mathrm\\{\\\\ ${item.latex}\\}`, "g");
    latex = latex.replace(regex, "const_" + item.constant);
  });
  // add a 0 in front of a dot (.) if the dot isn't preceded by a number or another dot
  latex = latex.replace(/(?<![\d.])\./g, "0.");
  // functions
  latexFunctionMap.forEach((item) => {
    const regex = new RegExp(`${item.latex}`, "g");
    latex = latex.replace(regex, item.exp);
  });
  // stored variable
  latex = latex.replace(/\\text{([A-D])}/, "$1");

  // //////// Require recursion: contains nesting of {} ////////
  // // detect the substring within {} that is the last child and located last in position
  // // ex. {abc}{def} match {def}
  // // ex. {{abc}def} match {abc}
  // // ex. {a}{b{c}d{{e}fg}} match {e}
  // const lastEnclosedSubstring = "{((?!.*{)[^{]+)}";
  // // detect any enclosed substring in a non-greedy way
  // const anyEnclosedSubstring = "{(.+?)}";

  function parse(latex) {
    // leaf node content: doesn't contain {,},[,]
    const s = "([^{}\\[\\]]+?)";
    const l = "\\\\left\\[";
    const r = "\\\\right\\]";
    let count = 0;

    // keep replacing until latex is a leaf node content
    while (/[{}\[\]\\]/.test(latex) && count < 10) {
      // log of base n: \\log_{a}\\left[b\\right] -> (log(b))/(log(a))
      latex = latex.replace(
        new RegExp(`\\\\log_{${s}}${l + s + r}`, "g"),
        (_, b, x) => `(log(${parse(x)}))/(log(${parse(b)}))`
      );

      // ncr: \\binom{a}{b} -> ((a)!)/((a-b)!*(c)!)
      latex = latex.replace(
        new RegExp(`\\\\binom{${s}}{${s}}`, "g"),
        (_, n, r) => {
          n = parse(n);
          r = parse(r);
          return `((${n})!)/(((${n})-(${r}))!*(${r})!)`;
        }
      );

      // sum: \\sum_{x=1}^{3}x^2 -> sum(x^2,x,1,3)
      latex = latex.replace(
        new RegExp(`\\\\sum_{(\\w+)=${s}}\\^{${s}}${l + s + r}`, "g"),
        (_, x, a, b, f) =>
          `sum(${parse(f)},${parse(x)},${parse(a)},${parse(b)})`
      );
      latex = latex.replace(
        new RegExp(`\\\\sum_{(\\w+)=${s}}\\^{${s}}${s}$`, "g"),
        (_, x, a, b, f) =>
          `sum(${parse(f)},${parse(x)},${parse(a)},${parse(b)})`
      );

      // prod: \\prod_{x=1}^{3}x^2 -> product(x^2,x,1,3)
      latex = latex.replace(
        new RegExp(`\\\\prod_{(\\w+)=${s}}\\^{${s}}${l + s + r}`, "g"),
        (_, x, a, b, f) =>
          `product(${parse(f)},${parse(x)},${parse(a)},${parse(b)})`
      );
      latex = latex.replace(
        new RegExp(`\\\\prod_{(\\w+)=${s}}\\^{${s}}${s}$`),
        (_, x, a, b, f) =>
          `product(${parse(f)},${parse(x)},${parse(a)},${parse(b)})`
      );

      // indefinite/definite integrals
      // \\int\\left\[x^2\\right\]dx -> integrate(x^2,x)
      latex = latex.replace(
        new RegExp(`\\\\int${l + s + r}d(\\w+)`, "g"),
        (_, f, x) => `integrate(${parse(f)},${parse(x)})`
      );
      latex = latex.replace(
        new RegExp(`\\\\int${s}d(\\w+)`, "g"),
        (_, f, x) => `integrate(${parse(f)},${parse(x)})`
      );

      // \\defint_{a}^{b}\\left\[x^2\\right\]dx -> defint(x^2,a,b,x)
      latex = latex.replace(
        new RegExp(`\\\\defint_{${s}}\\^{${s}}${l + s + r}d(\\w+)`, "g"),
        (_, a, b, f, x) =>
          `defint(${parse(f)},${parse(a)},${parse(b)},${parse(x)})`
      );
      latex = latex.replace(
        new RegExp(`\\\\defint_{${s}}\\^{${s}}${s}d(\\w+)`, "g"),
        (_, a, b, f, x) =>
          `defint(${parse(f)},${parse(a)},${parse(b)},${parse(x)})`
      );

      // differentiation
      // \\frac{d}{dx}\\left\[x^2\\right\]_{1} -> diffat(x^2,x,1)
      latex = latex.replace(
        new RegExp(`\\\\frac{d}{d(\\w+)}${l + "(.+)" + r}_{${s}}`, "g"),
        (_, x, f, a) => `diffat(${parse(f)},${parse(x)},${parse(a)})`
      );

      // \\frac{d}{dx}\\left\[x^2\\right\] -> diff(x^2,x)
      latex = latex.replace(
        new RegExp(`\\\\frac{d}{d(\\w+)}${l + s + r}`, "g"),
        (_, x, f) => `diff(${parse(f)},${parse(x)})`
      );
      latex = latex.replace(
        new RegExp(`\\\\frac{d}{d(\\w+)}${s}$`, "g"),
        (_, x, f) => `diff(${parse(f)},${parse(x)})`
      );

      // limit: \\lim_{x\\to0}\\left\[x^2\\right\] -> limit(x^2,x,0)
      latex = latex.replace(
        new RegExp(`\\\\lim_{(\\w+)\\\\to${s}}${l + s + r}`, "g"),
        (_, x, a, f) => `limit(${parse(f)},${parse(x)},${parse(a)})`
      );
      latex = latex.replace(
        new RegExp(`\\\\lim_{(\\w+)\\\\to${s}}${s}$`, "g"),
        (_, x, a, f) => `limit(${parse(f)},${parse(x)},${parse(a)})`
      );

      // sqrt: \\sqrt{b} -> sqrt(b)
      latex = latex.replace(
        new RegExp(`\\\\sqrt{${s}}`, "g"),
        (_, x) => `sqrt(${parse(x)})`
      );

      // root of n: \\sqrt[a]{b} -> (a)^(-1/(b))
      latex = latex.replace(
        new RegExp(`\\\\sqrt\\[${s}\\]{${s}}`, "g"),
        (_, e, x) => `(${parse(x)})^(1/(${parse(e)}))`
      );

      // REDUNDANT WITH ABOVE!
      // power: a^{b} -> a^(b)
      latex = latex.replace(
        new RegExp(`(?<!})\\^{${s}}`, "g"),
        (_, e) => `^(${parse(e)})`
      );

      // fractions: \\frac{1}{2} -> (1)/(2)
      latex = latex.replace(
        new RegExp(`\\\\frac{([^d{}\\[\\]]+?)}{${s}}`, "g"),
        (_, n, d) => `(${parse(n)})/(${parse(d)})`
      );

      count++;
      if (count === 10) {
        throw Error("Invalid input");
      }
    }
    return latex;
  }

  latex = parse(latex);

  //////// Require recursion: contains nesting of || ////////
  // deal with abs: \\left\|x\\right\| -> abs(x)
  function parseAbs(latex) {
    let count = 0;
    while (/\|/.test(latex) && count < 10) {
      latex = latex.replace(
        /\\left\|([^\|]+)\\right\|/g,
        (_, x) => `abs(${parseAbs(x)})`
      );

      count++;
      if (count === 10) {
        throw Error("Invalid input of |");
      }
    }
    return latex;
  }

  latex = parseAbs(latex);

  return latex;
}

function preprocessDisplayLatex(latex) {
  // remove //cdot in front of sqrt
  latex = latex.replace(/ \\cdot \\sqrt/g, "\\sqrt");
  // convert asin to arcsin, etc.
  latex = latex.replace(/\\mathrm{asin}/g, "\\arcsin");
  latex = latex.replace(/\\mathrm{acos}/g, "\\arccos");
  latex = latex.replace(/\\mathrm{atan}/g, "\\arctan");
  latex = latex.replace(/\\mathrm{asinh}/g, "\\arcsinh");
  latex = latex.replace(/\\mathrm{acosh}/g, "\\arccosh");
  latex = latex.replace(/\\mathrm{atanh}/g, "\\arctanh");
  return latex;
}

function saveHistory(answer) {
  store.history.unshift({
    id: store.id++,
    input: mathFieldRef.value.latex(),
    calculated: data.calculated,
    answer: answer,
  });
  localStorage.setItem("calcHistory", JSON.stringify(store.history));
  localStorage.setItem("historyId", store.id);
}

function calculateInput() {
  const mathField = mathFieldRef.value;
  if (mathField.latex()) {
    console.log({ latex: mathField.latex() });
    const exp = preprocessInputLatex(mathField.latex());
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
  const localStorageId = localStorage.getItem("historyId");
  store.id = localStorageId ? localStorageId : 0;

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
      "pi sqrt sum nthroot binom mu epsilon gamma alpha sigma phi infinity lambda",
    sumStartsWithNEquals: true,
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
  prefixes.forEach((item) => {
    nerdamer.setConstant(item.symbol, item.value);
  });

  function diffAt(exp_, x_, value_) {
    const exp = exp_.clone();
    const x = x_.clone();
    const value = value_.clone();
    const core = nerdamer.getCore();
    return core.Calculus.diff(exp, x).sub(x, value);
  }

  nerdamer.register({
    name: "diffat",
    visible: true,
    numargs: 3,
    build: function () {
      return diffAt;
    },
  });

  window.addEventListener("keydown", (evt) => {
    if (evt.shiftKey === true) {
      store.onShift = !store.onShift;
    }
  });

  // test here
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
      mathField.write("\\sum_{x=}^{ }\\left[\\right]");
      for (let i = 0; i < 4; i++) {
        mathField.keystroke("Left");
      }
      mathField.focus();
      break;
    case "\\prod":
      mathField.write("\\prod_{x=}^{ }\\left[\\right]");
      for (let i = 0; i < 4; i++) {
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
    case "\\lim":
      mathField.write("\\lim_{x\\to}\\left[\\right]");
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
