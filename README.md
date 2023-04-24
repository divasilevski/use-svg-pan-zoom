# Composable useSvgPanZoom
Pan/zoom composable for SVGs in vue 3. It adds events listeners for mouse, touch and scroll.

## Features
- Mouse pan
- Wheel zoom
- Touch pan
- Double touch zoom and rotate
- Reset positions
- Max/min scale

## How It Works
Under the hood, a group element is added to the svg. Through the transform group property, we move and scale the image. We use transformation matrices for performance computing.

## How To Use
Copy [composable](https://github.com/divasilevski/use-svg-pan-zoom/blob/master/composables/useSvgPanZoom.ts) to your project.

```vue
<template>
  <svg ref="svgRef">...</svg>
</template>

<script setup>
const {  svgRef } = useSvgPanZoom()
</script>
```

With all features
```vue
<script setup>
const { svgRef, reset, angle, scale } = useSvgPanZoom({
  isRotatable: true,
  isOnlyPan: false,
  maxScale: 2,
  minScale: 0.1,
})
</script>
```
