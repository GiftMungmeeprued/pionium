<script setup>
import { onMounted, ref, computed, reactive } from "vue";
import NumberPad from "./NumberPad.vue";
import Functions from "./Functions.vue";
import { store, resetShiftSto } from "./store";
import DisplayButton from "./DisplayButton.vue";

import Simplebar from "simplebar-vue";
import "simplebar-vue/dist/simplebar.min.css";
import CopyButton from "./CopyButton.vue";
import nerdamer from "nerdamer-prime/all.min.js";

const MQ = MathQuill.getInterface(2);

const mathFieldEl = ref(null);
const answerFieldEl = ref(null);
const mathFieldRef = computed(() => MQ.MathField(mathFieldEl.value));
const staticMathRef = computed(() => MQ.StaticMath(answerFieldEl.value));

const constants = ref(null);
const prefixes = ref(null);

const data = reactive({
  calculated: null,
  isRational: false,
  mixedFraction: false,
  solveMode: false,
  id: 0,
  displaymodes: [],
  angle: "rad",
  standardAns: "",
  decimalAns: "",
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
  constants.value.forEach((item) => {
    const regex = new RegExp(`\\\\mathrm\\{\\\\ ${item.latex}\\}`, "g");
    latex = latex.replace(regex, "const_" + item.constant + " ");
  });
  // add a 0 in front of a dot (.) if the dot isn't preceded by a number or another dot
  latex = latex.replace(/(?<![\d.])\./g, "0.");
  // functions
  latexFunctionMap.forEach((item) => {
    const regex = new RegExp(`${item.latex}`, "g");
    latex = latex.replace(regex, item.exp);
  });
  // stored variable
  latex = latex.replace(/\\text{([A-D])}/g, "$1 ");

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
    const s = "([^{}\\[\\]\\|]+?)";
    const l = "\\\\left\\[";
    const r = "\\\\right\\]";
    let count = 0;

    // keep replacing until latex is a leaf node content
    while (/[{}\[\]\\\|]/.test(latex) && count < 10) {
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

      // abs: \\left\|x\\right\| -> abs(x)
      latex = latex.replace(
        new RegExp(`\\\\left\\|${s}\\\\right\\|`, "g"),
        (_, x) => `abs(${parse(x)})`
      );

      count++;
      if (count === 10) {
        throw SyntaxError("Invalid input ");
      }
    }
    return latex;
  }

  latex = parse(latex);

  // deal with variables i,e,pi,A,B,C,D,x when use with no space
  latex = latex.replace(/i(?=([A-DFxie]|pi))/g, "i ");
  latex = latex.replace(/e(?=([A-DFxie]|pi))/g, "e ");
  latex = latex.replace(/([A-DFx])/g, "$1 ");

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

  latex = latex.replace(/\\mathrm{log}_\{10\}/g, "\\log");
  latex = latex.replace(/\\mathrm{log}/g, "\\mathrm{ln}");
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
  if (!data.solveMode) nerdamer.setVar("ans", data.calculated.toString());
  store.variables = nerdamer.getVars("latex");
}

function calculateInput() {
  const mathField = mathFieldRef.value;
  mathField.blur();
  store.displaymodeId = 0;
  let exp;
  if (mathField.latex()) {
    try {
      exp = preprocessInputLatex(mathField.latex());
      console.log(exp);
    } catch ({ name, message }) {
      staticMathRef.value.latex(`\\text{${name}: ${message}}`);
      return;
    }

    try {
      // evaluate mode
      if (!exp.includes("=")) {
        data.calculated =
          exp.includes("factor") || exp.includes("diffat")
            ? nerdamer(exp)
            : nerdamer(exp, {}, ["expand"]);
        // solve mode
      } else {
        function isEqualWithinBrackets(str) {
          let parentheses = 0;
          let curlyBraces = 0;
          let squareBrackets = 0;

          for (let i = 0; i < str.length; i++) {
            let char = str[i];

            // Handle opening brackets
            if (char === "(") parentheses++;
            if (char === "{") curlyBraces++;
            if (char === "[") squareBrackets++;

            // Handle closing brackets
            if (char === ")") parentheses--;
            if (char === "}") curlyBraces--;
            if (char === "]") squareBrackets--;

            // Check if '=' is within any open brackets
            if (
              char === "=" &&
              (parentheses > 0 || curlyBraces > 0 || squareBrackets > 0)
            ) {
              return true; // '=' is within brackets
            }
          }

          return false; // '=' is not within brackets
        }
        if (isEqualWithinBrackets(exp)) {
          throw SyntaxError("Invalid position of equals sign (=)");
        }
        data.calculated = nerdamer(`solve(${exp}, x)`);
        data.solveMode = true;
      }
    } catch ({ name, message }) {
      staticMathRef.value.latex(`\\text{${name}: ${message.split(":")[0]}}`);
      return;
    }

    const answer = displayAnswer();
    saveHistory(answer);
    return answer;
  }
}
onMounted(async () => {
  const constantsRes = await fetch("/constants.json");
  constants.value = await constantsRes.json();

  const prefixesRes = await fetch("/prefixes.json");
  prefixes.value = await prefixesRes.json();

  // prevent focus on answer field
  document.getElementsByClassName(
    "simplebar-content-wrapper"
  )[0].attributes[1].nodeValue = -1;

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
      "pi sqrt sum nthroot binom mu epsilon gamma alpha sigma phi infinity lambda hbar",
    sumStartsWithNEquals: true,
    handlers: {
      edit: function () {
        const staticMath = staticMathRef.value;
        staticMath.latex("");
        store.displaymodeId = 0;
        store.displaymodes = [];
        data.calculated = null;
        data.displayDecimal = true;
        data.mixedFraction = false;
        data.solveMode = false;
      },
      enter: calculateInput,
    },
  };

  mathFieldRef.value.config(config);
  mathFieldRef.value.focus();

  constants.value.forEach((item) => {
    nerdamer.setConstant("const_" + item.constant, item.value);
  });
  prefixes.value.forEach((item) => {
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
    if (evt.shiftKey === true && evt.altKey === true) {
      store.onShift = !store.onShift;
    }
  });

  const textfield = document.querySelector("span.mq-textarea");
  textfield.firstChild.setAttribute("inputmode", "none");
});

function handleTypedText(character) {
  if (!(document.activeElement.nodeName === "TEXTAREA")) {
    clearScreen();
  }
  mathFieldRef.value.typedText(character);
  mathFieldRef.value.focus();
  resetShiftSto();
}

function handleKeystroke(keystroke) {
  const mathField = mathFieldRef.value;
  if (keystroke == "Enter") {
    calculateInput();
  } else if (keystroke == "AC") {
    clearScreen();
    mathField.focus();
  } else {
    mathField.keystroke(keystroke);
    mathField.focus();
  }
  resetShiftSto();
}

function formatComplex(real, imag) {
  // format the complex number as standard a + bi
  // ex (-1,2) -> -1+2i
  // ex (1,2) -> 1+2i
  // ex (0,0) -> 0
  // ex (0, 1) -> i

  let displayReal, displayImag;
  if (real == "0") {
    displayReal = "";
  } else {
    displayReal = `${real}`;
  }

  if (imag == "0") {
    displayImag = "";
  } else {
    // add + in front of positive
    displayImag = imag.startsWith("-") ? imag : `+${imag}`;
    // remove 1 from 1i or -1i
    displayImag = `${
      displayImag === "+1" ? "+" : displayImag === "-1" ? "-" : displayImag
    }i`;
  }

  const display = displayReal + displayImag;

  if (display === "") {
    return "0";
  } else {
    // remove + in +2i
    if (display.startsWith("+")) {
      return display.slice(1);
    } else {
      return display;
    }
  }
}

function digitsSep(number) {
  const str = number.toString().split(".");
  str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, "$1\\ ");
  if (str[1]) {
    str[1] = str[1].replace(/(\d{3})/g, "$1\\ ");
  }
  console.log(str);
  return str.join(".");
}

function displayDecimal(number) {
  // display format for complex and scientific notation from fractions
  const realPartFraction = nerdamer(`realpart(${number})`).toString();
  const imagPartFraction = nerdamer(`imagpart(${number})`).toString();

  function convertToDecimals(fractionString) {
    if (fractionString == 0) {
      return [fractionString, false];
    }

    // convert 1.2488e-20 to 1.2488 \\cdot 10^{-20}
    // return [decimalString, displayDecimalOnlyBool]
    const [numerator, denominator] = fractionString.split("/");
    let decimalNumber;
    if (denominator) {
      decimalNumber = (numerator / denominator).toString();
    } else {
      decimalNumber = numerator;
    }

    // display standard form when denominator is defined (fractions not integers), and when denominator is not too large
    const displayStandard = Boolean(denominator) && denominator < 10000;

    function roundTo(numStr, n = 7) {
      const multiplier = 10 ** n;
      return (
        Math.round((parseFloat(numStr) + Number.EPSILON) * multiplier) /
        multiplier
      ).toString();
    }

    function toLatex(coeff, expon, engMode = false) {
      if (!engMode) {
        return `${digitsSep(
          roundTo(coeff, store.roundToNumDigits)
        )} \\cdot 10^{${expon}}`;
      } else {
        const quotient = Math.floor(expon / 3);
        const remainder = expon - quotient * 3;
        return `${digitsSep(
          roundTo(coeff, store.roundToNumDigits) * 10 ** remainder
        )} \\cdot 10^{${quotient * 3}}`;
      }
    }

    const [coeff, expon] = parseFloat(decimalNumber)
      .toExponential()
      .split("e")
      .map((item) => Number(item));

    if (store.displaySetting === "Norm") {
      if (expon < store.exponMin || expon > store.exponMax) {
        const latex = toLatex(coeff, expon, false);
        return [latex, displayStandard];
      } else {
        return [
          digitsSep(roundTo(decimalNumber, store.roundToNumDigits)),
          displayStandard,
        ];
      }
    } else if (store.displaySetting === "Sci") {
      const latex = toLatex(coeff, expon, false);
      return [latex, displayStandard];
    } else {
      // engineering notatation
      const latex = toLatex(coeff, expon, true);
      return [latex, displayStandard];
    }

    // if (decimalNumber.includes("e")) {
    //   const [coeff, expon] = decimalNumber.split("e");
    //   const latex = `${roundTo(coeff)} \\cdot 10^{${expon}}`;
    //   return [latex, displayStandard];
    // } else {
    //   return [roundTo(decimalNumber), displayStandard];
    // }
  }

  const [realPartDecimal, realPartdisplayStandard] =
    convertToDecimals(realPartFraction);
  const [imagPartDecimal, imagPartdisplayStandard] =
    convertToDecimals(imagPartFraction);

  const decimal = formatComplex(realPartDecimal, imagPartDecimal);
  const displayStandard =
    Boolean(realPartdisplayStandard) || Boolean(imagPartdisplayStandard);

  return [decimal, displayStandard];
}

function displayDecimalSolutions(solutions) {
  const solutionsArray = trim(solutions).split(",");
  const decimalSolutionsArray = [];
  const displayStandardArray = [];
  for (const solution of solutionsArray) {
    const [decimalSolution, displayStandard] = displayDecimal(solution);
    decimalSolutionsArray.push(decimalSolution);
    displayStandardArray.push(displayStandard);
  }
  return [decimalSolutionsArray.join(","), displayStandardArray.some(Boolean)];
}

function displayMixedFraction(fraction) {
  const numerator = fraction.numerator().toString();
  const denominator = fraction.denominator().toString();
  const isNegative = numerator < 0;
  const numeratorAbs = Math.abs(numerator).toString();
  const quotient = Math.floor(numeratorAbs / denominator);
  const remainder = numeratorAbs % denominator;
  return `${isNegative ? "-" : ""}${quotient != 0 ? quotient : ""}${
    remainder != 0 ? `\\frac{${remainder}}{${denominator}}` : ""
  }`;
}

function trim(x) {
  return x.substring(1, x.length - 1);
}

function displayStandard(answer) {
  const realPart = nerdamer(`realpart(${answer})`).toTeX();
  const imagPart = nerdamer(`imagpart(${answer})`).toTeX();
  return formatComplex(realPart, imagPart);
}

function displayStandardSolutions(solutions) {
  if (solutions == "[]") return "";
  const solutionsArray = trim(solutions).split(",");
  return solutionsArray.map(displayStandard).join(",");
}

function getDisplayModes() {
  const mustSimplify = /sin|cos|tan|csc|sec|cot|factorial|log/.test(
    data.calculated.toString()
  );
  const isEvaluable = /^[0-9+\-/i\[\]\(\),*]*$/.test(
    data.calculated.evaluate().text("fractions")
  );
  const hasExactForm = !/^[0-9+\-/i\[\]\(\),*]*$/.test(
    data.calculated.toString()
  );

  // evaluate expression
  const fractionAns = data.calculated.evaluate();
  // display format: standard form ex 25/2, pi, e, sqrt(3)/2, x^2
  data.standardAns = !data.solveMode
    ? preprocessDisplayLatex(displayStandard(data.calculated.toString()))
    : preprocessDisplayLatex(
        displayStandardSolutions(data.calculated.toString())
      );
  let decimalAns, shouldDisplayStandard;
  if (isEvaluable) {
    // display format: decimal point ex 1.254
    [decimalAns, shouldDisplayStandard] = !data.solveMode
      ? displayDecimal(fractionAns.text("fractions"))
      : displayDecimalSolutions(fractionAns.text("fractions"));

    data.decimalAns = decimalAns;

    // find available display modes
    store.displaymodes = ["dec"];
    // display standard form when
    // 1. for exact form (pi, e, sqrt(3)/2), the form should not be in the form of sin(4), log(7), 30!, etc
    // 2. for fraction, the denominator is not too large
    if ((!mustSimplify && hasExactForm) || shouldDisplayStandard) {
      store.displaymodes.unshift("std");
      if (
        (fractionAns.text("decimals") > 1 ||
          fractionAns.text("decimals") < -1) &&
        !data.solveMode &&
        shouldDisplayStandard
      ) {
        store.displaymodes.push("mix");
      }
    }
  } else {
    store.displaymodes = ["std"];
  }

  // for arg in radian
  if (
    data.angle === "rad" &&
    /\((\d+)\/(\d+)\)\*pi/.test(data.calculated.toString())
  ) {
    const denominator = data.calculated.denominator();
    if (denominator > 9999) {
      const index = store.displaymodes.indexOf("std");
      if (index > -1) {
        // only splice array when item is found
        store.displaymodes.splice(index, 1);
      }
    }
  }
}

function displayAnswer(togglemode = false) {
  if (data.calculated.toString() === "[]") {
    const noSolOutput = "\\text{No solutions found}";
    staticMathRef.value.latex(noSolOutput);
    return noSolOutput;
  }

  // get available display modes when not in the toggle mode (only need to do it once per answer)
  if (!togglemode) {
    getDisplayModes();
  }

  let answer = data.solveMode ? "x = " : "= ";

  const fractionAns = data.calculated.evaluate();

  const displaymode = store.displaymodes[store.displaymodeId];
  if (displaymode === "std") {
    answer = answer + data.standardAns;
  } else if (displaymode === "mix") {
    answer = answer + displayMixedFraction(fractionAns);
  } else {
    // simple decimal format
    answer = answer + data.decimalAns;
  }

  staticMathRef.value.latex(answer);

  return answer;
}

function clearScreen() {
  mathFieldRef.value.latex("");
  store.displaymodes = [];
  store.displaymodeId = 0;
}

function handleCmd(cmd) {
  const mathField = mathFieldRef.value;
  const staticMath = staticMathRef.value;

  if (!(document.activeElement.nodeName === "TEXTAREA")) {
    clearScreen();
  }

  switch (cmd) {
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
  mathField.focus();
  resetShiftSto();
}

function storeVar(var_name) {
  store.onSto = false;
  if (mathFieldRef.value.latex() && !data.solveMode) {
    const answer = calculateInput();
    nerdamer.setVar(var_name, data.calculated.toString());
    store.variables = nerdamer.getVars("latex");
    localStorage.setItem("calcVariables", JSON.stringify(store.variables));
    mathFieldRef.value.moveToRightEnd();
    mathFieldRef.value.write(`\\rightarrow \\text{${var_name}}`);
    staticMathRef.value.latex(answer);
  }
  resetShiftSto();
}

function toggleDisplay() {
  // go to the next display mode in the array displaymodes
  store.displaymodeId = (store.displaymodeId + 1) % store.displaymodes.length;
  displayAnswer(true);
}

function toggleAngle() {
  if (data.angle === "deg") {
    data.angle = "rad";
    nerdamer.set("ANGLE_UNIT", "radian");
  } else {
    data.angle = "deg";
    nerdamer.set("ANGLE_UNIT", "degree");
  }
}

function toggleDarkmode() {
  store.darkmode = !store.darkmode;
  localStorage.setItem("darkmode", store.darkmode);
  if (store.darkmode) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}
</script>
<template>
  <main class="h-full flex items-center">
    <div
      class="max-w-[416px] min-w-[320px] h-full max-h-[915px] tall:h-[673px] mx-auto w-screen flex flex-col border-solid border-2 border-[#E9EAEE] dark:border-[#3D4246]"
    >
      <div
        id="screen"
        class="grow-[2] flex flex-col bg-white dark:bg-[#313639ff]"
      >
        <div
          id="top-toolbar"
          class="bg-[#E9EAEE] dark:bg-[#3D4246] min-h-[20px] tall:h-[25px] flex justify-between"
        >
          <button
            title="Convert between degree and radian"
            class="rubik-font-bold border-0 w-8 mx-2 rounded font-bold uppercase text-xs tall:text-sm text-gray-500 dark:text-[#c2c7cbff] hover:text-gray-700 dark:hover:text-white"
            @click="toggleAngle()"
          >
            <span class="text-bottom"> {{ data.angle }}</span>
          </button>
          <div class="flex items-center">
            <button
              title="Display settings"
              class="text-gray-500 dark:text-[#c2c7cbff] hover:text-gray-700 dark:hover:text-white mr-3"
              aria-haspopup="dialog"
              aria-expanded="false"
              aria-controls="toolbar-modal"
              data-hs-overlay="#toolbar-modal"
            >
              <i class="pi pi-cog text-sm"></i>
            </button>
            <button
              title="Toggle between light and dark modes"
              class="text-gray-500 dark:text-[#c2c7cbff] hover:text-gray-700 dark:hover:text-white mr-3"
              @click="toggleDarkmode"
            >
              <i v-if="store.darkmode" class="pi pi-sun text-sm"></i>
              <i v-else class="pi pi-moon text-sm"></i>
            </button>
            <CopyButton class="mr-2" />
          </div>
        </div>
        <Simplebar class="overflow-y-auto w-full px-3 py-3 h-20 tall:h-30 grow">
          <span ref="mathFieldEl" id="math-field"></span>
        </Simplebar>
        <div class="flex">
          <Simplebar
            class="h-[60px] text-right leading-[60px] overflow-auto w-full"
          >
            <span ref="answerFieldEl" class="mx-2" id="answer"></span>
          </Simplebar>
          <DisplayButton @toggledisplay="toggleDisplay()" />
        </div>
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

.button:hover {
  filter: brightness(0.96);
}
.button:active {
  filter: brightness(0.9);
}

.rubik-font {
  font-family: "Rubik", sans-serif;
  font-optical-sizing: auto;
  font-weight: 500;
  font-style: normal;
}

.rubik-font-bold {
  font-family: "Rubik", sans-serif;
  font-optical-sizing: auto;
  font-weight: 500;
  font-style: bold;
}

textarea {
  pointer-events: none;
}
</style>
