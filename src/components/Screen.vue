<script setup>
import { onMounted, ref } from "vue";
import "mathquill/build/mathquill.min.js";
import { ComputeEngine } from "https://unpkg.com/@cortex-js/compute-engine?module";

onMounted(() => {
  const MQ = MathQuill.getInterface(2);
  const ce = new ComputeEngine();
  const mathFieldSpan = document.getElementById("math-field");
  const config = {
    autoCommands: "pi sqrt sum",
    sumStartsWithNEquals: true,
    handlers: {
      enter: function () {
        console.log(mathField.latex());
        console.log(ce.parse(mathField.latex()).evaluate().value);
      },
    },
  };
  const mathField = MQ.MathField(mathFieldSpan, config);
  const answerField = document.getElementById("answer");
  MQ.StaticMath(answerField);
});
</script>
<template>
  <div class="bg-gray-100 w-[416px] mt-5 border-2 border-red-500">
    <div class="w-full px-3 py-5 text-xl" id="math-field"></div>
    <div class="bg-red-100 h-10 flex items-center justify-end">
      <span class="bg-blue-100" id="answer">=sin(45)</span>
    </div>
  </div>
</template>
<style scoped>
#math-field {
  border-width: 0;
  background: rgba(0, 0, 0, 0.2);
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
