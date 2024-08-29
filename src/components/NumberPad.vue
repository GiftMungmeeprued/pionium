<script setup>
import Button from "./Button.vue";
import { ArrowTurnDownLeftIcon } from "@heroicons/vue/16/solid";
</script>
<template>
  <div class="bg-[#E9EAEE] grid grid-cols-5 gap-1 p-1.5 py-3">
    <Button main-title="7" @click="$emit('typedText', '7')"> 7 </Button>
    <Button main-title="8" @click="$emit('typedText', '8')"> 8</Button>
    <Button main-title="9" @click="$emit('typedText', '9')"> 9</Button>
    <Button main-title="Divide" @click="$emit('typedText', '/')">÷</Button>
    <Button
      main-title="Clear screen"
      @click="$emit('keystroke', 'AC')"
      color="gray"
    >
      AC
    </Button>
    <Button main-title="4" @click="$emit('typedText', '4')">4</Button>
    <Button main-title="5" @click="$emit('typedText', '5')">5</Button>
    <Button main-title="6" @click="$emit('typedText', '6')">6</Button>
    <Button main-title="Multiply" @click="$emit('typedText', '*')">×</Button>
    <Button
      main-title="Answer from previous calculation"
      @click="$emit('typedText', 'Ans')"
      color="gray"
      >Ans</Button
    >
    <Button main-title="1" @click="$emit('typedText', '1')">1</Button>
    <Button main-title="2" @click="$emit('typedText', '2')">2</Button>
    <Button main-title="3" @click="$emit('typedText', '3')">3</Button>
    <Button main-title="Subtract" @click="$emit('typedText', '-')">–</Button>

    <Button
      @click="$emit('keystroke', 'Backspace')"
      main-title="Delete backwards"
      color="gray"
    >
      <i class="pi pi-delete-left"></i
    ></Button>
    <Button main-title="0" @click="$emit('typedText', '0')">0</Button>
    <Button main-title="Decimal point" @click="$emit('typedText', '.')"
      >.</Button
    >
    <Button main-title="Power of 10" @click="$emit('typedText', '*10^')">
      <span class="text-sm relative tall:text-3xl">
        ×10<sup
          ><math><mi>x</mi></math></sup
        >
      </span>
    </Button>
    <Button main-title="Add" @click="$emit('typedText', '+')">+</Button>

    <Button
      main-title="Calculate"
      @click="$emit('keystroke', 'Enter')"
      color="blue"
    >
      <ArrowTurnDownLeftIcon class="size-6 tall:size-8 inline" />
    </Button>
  </div>
</template>
