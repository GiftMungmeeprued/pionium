<script setup>
import Button from "./Button.vue";
import { ArrowTurnDownLeftIcon } from "@heroicons/vue/16/solid";
</script>
<template>
  <div class="bg-[#E9EAEE] grid grid-cols-5 gap-1 p-1.5 py-3">
    <Button main-title="Seven" @mousedown.prevent="$emit('typedText', '7')">
      7
    </Button>
    <Button main-title="Eight" @mousedown.prevent="$emit('typedText', '8')">
      8</Button
    >
    <Button main-title="Nine" @mousedown.prevent="$emit('typedText', '9')">
      9</Button
    >
    <Button main-title="Divide" @mousedown.prevent="$emit('typedText', '/')"
      >÷</Button
    >
    <Button
      main-title="Clear screen"
      @mousedown.prevent="$emit('keystroke', 'AC')"
      color="gray"
    >
      AC
    </Button>
    <Button main-title="Four" @mousedown.prevent="$emit('typedText', '4')"
      >4</Button
    >
    <Button main-title="Five" @mousedown.prevent="$emit('typedText', '5')"
      >5</Button
    >
    <Button main-title="Six" @mousedown.prevent="$emit('typedText', '6')"
      >6</Button
    >
    <Button main-title="Multiply" @mousedown.prevent="$emit('typedText', '*')"
      >×</Button
    >
    <Button
      main-title="Answer from previous calculation"
      @mousedown.prevent="$emit('typedText', 'Ans')"
      color="gray"
      >Ans</Button
    >
    <Button main-title="One" @mousedown.prevent="$emit('typedText', '1')"
      >1</Button
    >
    <Button main-title="Two" @mousedown.prevent="$emit('typedText', '2')"
      >2</Button
    >
    <Button main-title="Three" @mousedown.prevent="$emit('typedText', '3')"
      >3</Button
    >
    <Button main-title="Subtract" @mousedown.prevent="$emit('typedText', '-')"
      >–</Button
    >

    <Button
      @mousedown.prevent="$emit('keystroke', 'Backspace')"
      main-title="Delete backwards"
      color="gray"
    >
      <i class="pi pi-delete-left"></i
    ></Button>
    <Button main-title="Zero" @mousedown.prevent="$emit('typedText', '0')"
      >0</Button
    >
    <Button
      main-title="Decimal point"
      @mousedown.prevent="$emit('typedText', '.')"
      >.</Button
    >
    <Button
      main-title="Power of 10"
      @mousedown.prevent="$emit('typedText', '*10^')"
    >
      <span class="text-sm relative tall:text-3xl">
        ×10<sup
          ><math><mi>x</mi></math></sup
        >
      </span>
    </Button>
    <Button main-title="Add" @mousedown.prevent="$emit('typedText', '+')"
      >+</Button
    >

    <Button
      main-title="Calculate"
      @mousedown.prevent="$emit('keystroke', 'Enter')"
      color="blue"
    >
      <ArrowTurnDownLeftIcon class="size-6 tall:size-8 inline" />
    </Button>
  </div>
</template>
