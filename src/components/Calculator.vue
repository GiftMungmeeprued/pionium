<script setup>
import { onMounted, ref, computed } from "vue";
import "mathquill/build/mathquill.min.js";
import { ComputeEngine } from "https://unpkg.com/@cortex-js/compute-engine?module";

import NumberPad from "./NumberPad.vue";
import Functions from "./Functions.vue";

const MQ = MathQuill.getInterface(2);
const ce = new ComputeEngine();

// const mathFieldEl = ref(null);
// const answerFieldEl = ref(null);
// const mathField = ref(null);
// const staticMath = ref(null);

function handleEnter() {
  const calculated = ce.parse(mathField.latex()).evaluate();
  console.log(calculated.json);
  const isRational =
    Array.isArray(calculated.json) &&
    (calculated.json.flat().includes("Rational") ||
      calculated.json.flat().includes("Sqrt"));
  const latex = `= ${isRational ? calculated.latex : calculated.value}`;
  const obj = {
    latex: `= ${isRational ? calculated.latex : calculated.value}`,
  };
  console.log(obj);

  staticMath.latex("= \\frac{17\,722\,777}{26\,111\,821\,184\,927}");

  // console.log(isRational);
  // staticMath.latex(
  //   `= ${isRational ? calculated.latex : calculated.value}`
  // );

  // mathField.blur();
}

onMounted(() => {
  const mathFieldEl = document.getElementById("math-field");
  const answerFieldEl = document.getElementById("answer");
  const config = {
    autoCommands: "pi sqrt sum",
    sumStartsWithNEquals: true,
    handlers: {
      edit: function () {
        staticMath.latex("");
      },
      enter: () => {
        const calculated = ce.parse(mathField.latex()).evaluate();
        const isRational =
          Array.isArray(calculated.json) &&
          (calculated.json.flat().includes("Rational") ||
            calculated.json.flat().includes("Sqrt"));
        staticMath.latex(
          `= ${isRational ? calculated.latex : calculated.value}`
        );
        console.log(isRational);
        console.log(calculated.latex);
        console.log(calculated.value);
      },
    },
  };
  const mathField = MQ.MathField(mathFieldEl, config);
  const staticMath = MQ.StaticMath(answerFieldEl);
  mathField.focus();

  // const mathField = computed(() => MQ.MathField(mathFieldEl.value, config));
  // mathField.value = MQ.MathField(mathFieldEl.value, config);
  // mathField.value.focus();
  // mathField.value.latex("\\sin(8)");
  // const staticMath = computed(() => MQ.StaticMath(answerFieldEl.value));
  // staticMath.value = MQ.StaticMath(answerFieldEl.value);
  // mathField.typedText("sin(");
});

function handleTypedText(character) {
  mathField.typedText(character);
  mathField.focus();
}

function handleKeystroke(keystroke) {
  if (keystroke == "Enter") {
    handleEnter();
  }
  // mathField.keystroke("Enter");
  mathField.focus();
}
</script>
<template>
  <main class="flex flex-col items-center content-end h-screen">
    <div class="bg-gray-100 w-[416px] mt-5 border-2 border-gray-500">
      <div
        class="w-full px-3 py-5 text-5xl"
        ref="mathFieldEl"
        id="math-field"
      ></div>
      <div class="px-3 min-h-10 bg-gray-200 flex items-center justify-end">
        <span ref="answerFieldEl" id="answer"></span>
      </div>
    </div>
    <Functions />
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
