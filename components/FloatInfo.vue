<template>
  <div class="float">
    <div class="container">
      <span>{{ zoom }} <small>%</small></span>
      <button @click="emits('reset')">Reset</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
const emits = defineEmits(['reset'])
const props = defineProps({
  scale: {
    type: Number,
    default: 1,
  },
})

const zoom = computed(() => (props.scale * 100).toFixed().padStart(4, ' '))
</script>

<style scoped>
.float {
  position: fixed;
  bottom: 24px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
}

.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
  width: min-content;

  padding: 12px;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
}

span {
  white-space: pre;
}

button {
  box-shadow: inset 0px 1px 0px 0px #ffffff;
  background: linear-gradient(to bottom, #ffffff 5%, #f6f6f6 100%);
  background-color: #ffffff;
  border-radius: 6px;
  border: 1px solid #dcdcdc;
  display: inline-block;
  cursor: pointer;
  color: #666666;
  font-size: 15px;
  font-weight: bold;
  padding: 6px 24px;
  text-decoration: none;
  text-shadow: 0px 1px 0px #ffffff;
}
button:hover {
  background: linear-gradient(to bottom, #f6f6f6 5%, #ffffff 100%);
  background-color: #f6f6f6;
}
button:active {
  position: relative;
  top: 1px;
}
</style>
