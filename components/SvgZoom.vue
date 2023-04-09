<template>
  <div style="all: inherit" ref="containerRef">
    <slot />
  </div>
</template>

<script lang="ts" setup>
interface Params {
  svgElement: null | SVGSVGElement;
  svgPoint: null | SVGPoint;
  viewBox: Record<"x" | "y" | "width" | "height", number>;
}

const props = defineProps({
  scaleFactor: {
    type: Number,
    default: 1.2,
  },
});

const containerRef = ref();

const params: Params = {
  svgElement: null,
  svgPoint: null,
  viewBox: { x: 0, y: 0, width: 0, height: 0 },
};

const updateViewBox = () => {
  if (!params.svgElement) return;

  const { x, y, width, height } = params.viewBox;
  params.svgElement.setAttribute("viewBox", `${x} ${y} ${width} ${height}`);
};

const onWheel = (event: WheelEvent) => {
  if (!params.svgElement || !params.svgPoint) return;

  const delta = event.deltaY || event.detail || 0;
  const normalized = -(delta % 3 ? delta * 10 : delta / 3);
  const scaleDelta = normalized > 0 ? 1 / props.scaleFactor : props.scaleFactor;

  params.svgPoint.x = event.clientX;
  params.svgPoint.y = event.clientY;
  const matrix = params.svgElement?.getScreenCTM()?.inverse();
  const startPoint = params.svgPoint.matrixTransform(matrix);

  params.viewBox.x -= (startPoint.x - params.viewBox.x) * (scaleDelta - 1);
  params.viewBox.y -= (startPoint.y - params.viewBox.y) * (scaleDelta - 1);
  params.viewBox.width *= scaleDelta;
  params.viewBox.height *= scaleDelta;

  updateViewBox();
};

const initParams = () => {
  const el = containerRef.value.querySelector("svg");

  if (!el) {
    console.error("SvgZoom does not contain svg child.");
    return;
  }

  params.svgElement = el;
  params.svgPoint = el.createSVGPoint();
  params.viewBox = el.viewBox.baseVal;
};

onMounted(() => {
  initParams();
  params.svgElement?.addEventListener("wheel", onWheel, { passive: true });
});

onUnmounted(() => {
  params.svgElement?.removeEventListener("wheel", onWheel);
});
</script>
