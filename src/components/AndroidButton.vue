<script lang="ts" setup>
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
    :disabled="isDisabled"
    :style="{
      background: background,
      color: color,
      right: '18px',
      width: isThin ? 'calc(100% - 151px)' : 'calc(100vw - 2 * 18px)',
    }">
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
  margin-top: 24px;
  width: calc(100vw - 2 * 18px);
}

button:disabled {
  cursor: not-allowed;
}
</style>
