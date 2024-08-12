<script setup>
import SmallButton from "./SmallButton.vue";
</script>
<template>
  <div class="grid grid-cols-2 bg-gray-200 gap-1 my-2 mx-1">
    <SmallButton>%</SmallButton>
    <SmallButton>
      <math display="inline">
        <mrow><mtext>|</mtext><mi>▮</mi><mtext>|</mtext></mrow>
      </math>
    </SmallButton>

    <!-- Fractions -->
    <SmallButton>
      <math display="block" class="text-[8px]">
        <mfrac><mi>▮</mi><mi>▯</mi></mfrac>
      </math>
    </SmallButton>
    <SmallButton>
      <math display="block" class="text-[8px]">
        <mi>▮</mi>
        <mfrac><mi>▯</mi><mi>▯</mi></mfrac>
      </math>
    </SmallButton>

    <!-- Powers -->
    <SmallButton>
      <math display="block">
        <msup><mi>x</mi><mn>2</mn></msup>
      </math>
    </SmallButton>
    <SmallButton>
      <math display="block">
        <msup><mi>x</mi><mn>▮</mn></msup>
      </math>
    </SmallButton>

    <!-- Roots -->
    <SmallButton class="text-xs">
      <math display="block">
        <msqrt>
          <mi>▮</mi>
        </msqrt>
      </math>
    </SmallButton>
    <SmallButton>
      <math display="block" class="text-xs">
        <mroot>
          <mi>▯</mi>
          <mi>▮</mi>
        </mroot>
      </math>
    </SmallButton>
  </div>
</template>
