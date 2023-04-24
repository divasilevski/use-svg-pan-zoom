<template>
  <div class="wrapper">
    <SvgExample @layout="onLayout" />
    <FloatInfo :scale="scale" @reset="reset" />
  </div>
</template>

<script lang="ts" setup>
useHead({ title: 'Composable useSvgPanZoom' })

const { svgRef, reset, scale } = useSvgPanZoom()

const onLayout = (element: Element) => {
  svgRef.value = element
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Arial, Helvetica, sans-serif;
}

.wrapper {
  overflow: hidden;
  width: 100%;
  height: 100vh;
}

.wrapper svg {
  width: 100%;
  height: 100%;
}
</style>
