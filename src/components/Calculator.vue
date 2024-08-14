<script setup>
import { onMounted, ref } from "vue";
import "mathquill/build/mathquill.min.js";
import { ComputeEngine } from "https://unpkg.com/@cortex-js/compute-engine?module";

import NumberPad from "./NumberPad.vue";
import Functions from "./Functions.vue";

onMounted(() => {
  const MQ = MathQuill.getInterface(2);
  const ce = new ComputeEngine();
  const mathFieldSpan = document.getElementById("math-field");
  const answerField = document.getElementById("answer");
  const config = {
    autoCommands: "pi sqrt sum",
    sumStartsWithNEquals: true,
    handlers: {
      edit: function () {
        staticMath.latex("");
      },
      enter: function () {
        console.log(mathField.latex());
        const calculated = ce.parse(mathField.latex()).evaluate();
        // console.log(calculated.json.flat());
        const isRational =
          Array.isArray(calculated.json) &&
          (calculated.json.flat().includes("Rational") ||
            calculated.json.flat().includes("Sqrt"));
        staticMath.latex(
          `= ${isRational ? calculated.latex : calculated.value}`
        );
        // mathField.blur();
      },
    },
  };
  const mathField = MQ.MathField(mathFieldSpan, config);
  const staticMath = MQ.StaticMath(answerField);
  // mathField.typedText("sin(");
});
</script>
<template>
  <main class="flex flex-col items-center content-end h-screen">
    <div class="bg-gray-100 w-[416px] mt-5 border-2 border-gray-500">
      <div class="w-full px-3 py-5 text-5xl" id="math-field"></div>
      <div class="px-3 min-h-10 bg-gray-200 flex items-center justify-end">
        <span id="answer"></span>
      </div>
    </div>
    <Functions />
    <NumberPad />
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
