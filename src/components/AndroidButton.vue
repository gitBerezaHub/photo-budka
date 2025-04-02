<script setup lang="ts">
withDefaults(
  defineProps<{
    text?: string
    background?: string
    color?: string
    isDisabled?: boolean
    margin?: number
    isThin?: boolean
  }>(),
  {
    text: 'Далее',
    background: '#2990FF',
    color: '#FFFFFF',
    isDisabled: false,
    margin: 24,
    isThin: false,
  }
)
</script>

<template>
  <button
    :style="{
      background: background,
      color: color,
      bottom: `${margin}px`,
      right: '18px',
      width: isThin ? 'calc(100% - 151px)' : 'calc(100vw - 2 * 18px)',
    }"
    :disabled="isDisabled">
    {{ text }}
  </button>
</template>

<style scoped>
button {
  border: none;
  cursor: pointer;
  height: 50px;
  border-radius: 8px;
  font-size: 17px;
  position: fixed;
  bottom: 24px;
  width: calc(100vw - 2 * 18px);
}

button:disabled {
  cursor: not-allowed;
}
</style>
