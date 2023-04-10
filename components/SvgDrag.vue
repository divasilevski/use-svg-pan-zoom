<template>
  <div style="all: inherit" ref="containerRef">
    <slot />
  </div>
</template>

<script lang="ts" setup>
interface Params {
  svgElement: null | SVGSVGElement;
  svgChild: null | SVGSVGElement;
  svgPoint: null | SVGPoint;
  offset: Record<"x" | "y", number>;
  attrs: Record<"x" | "y", number>;
  pointerId: null | number;
}

const containerRef = ref();

const params: Params = {
  svgElement: null,
  svgChild: null,
  svgPoint: null,
  offset: { x: 0, y: 0 },
  attrs: { x: 0, y: 0 },
  pointerId: null,
};

const updateAttributes = (x: number, y: number) => {
  if (!params.svgChild) return;

  params.attrs = { x, y };

  params.svgChild.setAttribute("x", `${x}`);
  params.svgChild.setAttribute("y", `${y}`);
};

const getStartPoint = (event: PointerEvent) => {
  if (!params.svgPoint) return { x: 0, y: 0 };

  params.svgPoint.x = event.clientX;
  params.svgPoint.y = event.clientY;

  const matrix = params.svgElement?.getScreenCTM()?.inverse();
  return params.svgPoint.matrixTransform(matrix);
};

const onStart = (event: PointerEvent) => {
  params.pointerId = event.pointerId;
  const startPoint = getStartPoint(event);

  params.offset = {
    x: startPoint.x - params.attrs.x,
    y: startPoint.y - params.attrs.y,
  };

  const onMove = (event: PointerEvent) => {
    if (event.pointerId !== params.pointerId) return;

    const startPoint = getStartPoint(event);
    const x = startPoint.x - params.offset.x;
    const y = startPoint.y - params.offset.y;

    updateAttributes(x, y);
  };

  const onEnd = () => {
    document.removeEventListener("pointermove", onMove);
    document.removeEventListener("pointerup", onEnd);
  };

  document.addEventListener("pointermove", onMove, { passive: true });
  document.addEventListener("pointerup", onEnd, { passive: true });
};

const appendNode = (parent: SVGSVGElement) => {
  const node = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  const width = parent.getAttribute("width");
  const height = parent.getAttribute("height");

  width && node.setAttribute("width", width);
  height && node.setAttribute("height", height);
  node.insertAdjacentHTML("afterbegin", parent.innerHTML);

  parent.innerHTML = "";
  parent.appendChild(node);

  params.svgChild = node;
};

const initParams = () => {
  const el = containerRef.value.querySelector("svg");

  if (!el) {
    console.error("SvgDrag does not contain svg child.");
    return;
  }

  params.svgElement = el;
  params.svgPoint = el.createSVGPoint();

  appendNode(el);
};

onMounted(() => {
  initParams();
  params.svgElement?.addEventListener("pointerdown", onStart, {
    passive: true,
  });
});

onUnmounted(() => {
  params.svgElement?.removeEventListener("pointerdown", onStart);
});
</script>
