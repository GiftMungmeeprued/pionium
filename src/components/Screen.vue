<script setup>
import { onMounted } from "vue";

import "mathquill/build/mathquill.js";
onMounted(() => {
  const MQ = MathQuill.getInterface(2);
  const mathFieldSpan = document.getElementById("math-field");
  const config = {
    autoCommands: "pi theta sqrt sum",
    handlers: {
      edit: function () {
        console.log(mathField.latex());
      },
    },
  };
  const mathField = MQ.MathField(mathFieldSpan, config);
});
</script>
<template>
  <div class="bg-gray-100 w-[416px] mt-5">
    <div class="bg-white bg-opacity-0 w-full px-3 py-5 text-xl" id="math-field">
      log(x)
    </div>
  </div>
</template>
