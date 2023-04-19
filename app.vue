<template>
  <div class="wrapper">
    <SvgExample />
  </div>
</template>

<script lang="ts" setup></script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.wrapper {
  overflow: hidden;
  width: 100%;
  height: 90vh;
}

.wrapper svg {
  width: 100%;
  height: 100%;
  border: 1px solid black;
  cursor: grab;
  touch-action: none;
}
</style>
