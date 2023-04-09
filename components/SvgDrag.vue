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
}

const containerRef = ref();

const params: Params = {
  svgElement: null,
  svgChild: null,
  svgPoint: null,
  offset: { x: 0, y: 0 },
  attrs: { x: 0, y: 0 },
};

const updateAttributes = (x: number, y: number) => {
  if (!params.svgChild) return;

  params.attrs = { x, y };

  params.svgChild.setAttribute("x", `${x}`);
  params.svgChild.setAttribute("y", `${y}`);
};

const onMousedown = (event: MouseEvent) => {
  if (!params.svgElement || !params.svgPoint) return;

  event.preventDefault();

  params.svgPoint.x = event.clientX;
  params.svgPoint.y = event.clientY;
  const matrix = params.svgElement?.getScreenCTM()?.inverse();
  params.svgPoint = params.svgPoint.matrixTransform(matrix);

  params.offset = {
    x: params.svgPoint.x - params.attrs.x,
    y: params.svgPoint.y - params.attrs.y,
  };

  const mousemove = (event: MouseEvent) => {
    if (!params.svgElement || !params.svgPoint) return;

    event.preventDefault();

    params.svgPoint.x = event.clientX;
    params.svgPoint.y = event.clientY;
    const matrix = params.svgElement?.getScreenCTM()?.inverse();
    const startPoint = params.svgPoint.matrixTransform(matrix);

    const x = startPoint.x - params.offset.x;
    const y = startPoint.y - params.offset.y;

    updateAttributes(x, y);
  };

  const mouseup = () => {
    document.removeEventListener("mousemove", mousemove);
    document.removeEventListener("mouseup", mouseup);
  };

  document.addEventListener("mousemove", mousemove);
  document.addEventListener("mouseup", mouseup);
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
  params.svgElement?.addEventListener("mousedown", onMousedown);
});

onUnmounted(() => {
  params.svgElement?.removeEventListener("mousedown", onMousedown);
});
</script>

<style scoped />
