<script setup lang="ts">
withDefaults(
    defineProps<{
      text: string,
      background: string,
      color: string,
      isDisabled: boolean
    }>(),
    {
      text: 'Далее',
      background: '#2990FF',
      color: '#FFFFFF',
      isDisabled: false
    }
)
</script>

<template>
  <button :style="{ background: background, color: color }" :disabled="isDisabled">
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
  bottom: 10px;
  width: inherit;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
