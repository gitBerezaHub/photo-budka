<script setup lang="ts">
withDefaults(
  defineProps<{
    text?: string
    background?: string
    color?: string
    isDisabled?: boolean,
    margin?: number
  }>(),
  {
    text: 'Далее',
    background: '#2990FF',
    color: '#FFFFFF',
    isDisabled: false,
    margin: 24
  }
)
</script>

<template>
  <button
    :style="{ background: background, color: color, bottom: `${margin}px` }"
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
  width: inherit;
}

button:disabled {
  cursor: not-allowed;
}
</style>
