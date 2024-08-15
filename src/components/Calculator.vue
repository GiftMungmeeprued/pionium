<script setup>
import { onMounted, ref, computed, reactive } from "vue";
import "mathquill/build/mathquill.min.js";
import { ComputeEngine } from "https://unpkg.com/@cortex-js/compute-engine?module";

import NumberPad from "./NumberPad.vue";
import Functions from "./Functions.vue";

const MQ = MathQuill.getInterface(2);
const ce = new ComputeEngine();

const mathFieldEl = ref(null);
const answerFieldEl = ref(null);
const mathFieldRef = computed(() => MQ.MathField(mathFieldEl.value));
const staticMathRef = computed(() => MQ.StaticMath(answerFieldEl.value));

const store = reactive({
  calculated: "",
  isRational: false,
  SD: false,
});

function handleEnter() {
  const mathField = mathFieldRef.value;
  const staticMath = staticMathRef.value;
  store.calculated = ce.parse(mathField.latex()).evaluate();
  store.isRational =
    Array.isArray(store.calculated.json) &&
    (store.calculated.json.flat().includes("Rational") ||
      store.calculated.json.flat().includes("Sqrt"));
  if (typeof store.calculated.value === "number") {
    staticMath.latex(
      `= ${
        store.isRational
          ? store.calculated.latex.replace(/\\,/g, "")
          : store.calculated.value
      }`
    );
  }
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
}

function handleCmd(cmd) {
  const mathField = mathFieldRef.value;
  const staticMath = staticMathRef.value;

  if (cmd === "\\int") {
    mathField.write("\\int_{ }^{ } \\left(\\right) \\mathrm{d}x");
  } else if (cmd === "\\sum") {
    mathField.write("\\sum_{x=}^{ }");
  } else if (cmd === "SD") {
    if (store.isRational) {
      staticMath.latex(
        `= ${
          store.SD
            ? store.calculated.latex.replace(/\\,/g, "")
            : store.calculated.value
        }`
      );
      store.SD = !store.SD;
    }
  } else {
    mathField.write(cmd);
  }
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
