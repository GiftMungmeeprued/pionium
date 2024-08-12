<script setup>
import SmallButton from "./SmallButton.vue";
// const functions = ["e", "π", "log", "ln"];
</script>
<template>
  <div class="bg-gray-200 gap-1 my-2 mx-1 grid grid-cols-3">
    <SmallButton>
      <math display="inline">
        <mi class="font-bold">(</mi>
      </math>
    </SmallButton>
    <SmallButton>
      <math display="inline">
        <mi class="font-bold">)</mi>
      </math>
    </SmallButton>
    <SmallButton>
      <math display="inline">
        <mi class="font-bold">i</mi>
      </math>
    </SmallButton>
    <SmallButton>
      <math display="inline">
        <mi>π</mi>
      </math>
    </SmallButton>
    <SmallButton>
      <math display="inline">
        <mi>e</mi>
      </math>
    </SmallButton>
    <SmallButton>
      <math display="inline">
        <msup><mi>e</mi><mi>▮</mi></msup>
      </math>
    </SmallButton>
    <SmallButton>
      <math display="inline">
        <msup><mi>10</mi><mi>▮</mi></msup>
      </math>
    </SmallButton>
    <SmallButton>
      <math display="inline">
        <mi>ln</mi>
      </math>
    </SmallButton>
    <SmallButton>
      <math display="inline" class="text-xs">
        <mi>log</mi>
      </math>
    </SmallButton>
    <SmallButton>
      <math display="inline" class="text-[10px]">
        <mrow>
          <msub>
            <mi>log</mi>
            <mi>◼</mi>
          </msub>
          <mi>▯</mi>
        </mrow>
      </math>
    </SmallButton>
  </div>
</template>
