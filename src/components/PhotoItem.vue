<template>
  <div class="photo-item" @click="$emit('click', photo)">
    <img :src="photo.url" alt="Фото" class="photo-thumbnail" />

    <div class="delete-icon" @click.stop="$emit('delete', photo)">
      <img src="../assets/delete.svg" alt="" />
    </div>

    <div class="checkmark-icon" v-if="!photo.hasMultiplePeople">
      <img src="../assets/checkmark.svg" alt="" />
    </div>

    <div v-if="photo.hasMultiplePeople" class="multiple-people-warning">
      <img class="warning-icon" src="../assets/warning.svg" alt="" />
      <div class="warning-text">Несколько людей</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Photo } from '../api/types.ts'

defineProps<{
  photo: Photo
}>()

defineEmits<{
  (e: 'click', photo: Photo): void
  (e: 'delete', photo: Photo): void
}>()
</script>

<style scoped>
.photo-item {
  position: relative;
  width: 100%;
  aspect-ratio: 1/1;
  border-radius: 8px;
  overflow: hidden;
  background-color: #2a2a2a;
}

.photo-thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.delete-icon,
.checkmark-icon {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.delete-icon {
  top: 8px;
  right: 8px;
  width: 16px;
  height: 16px;
}

.checkmark-icon {
  bottom: 8px;
  left: 8px;
  width: 24px;
  height: 24px;
}

.multiple-people-warning {
  position: absolute;
  top: 36px;
  left: 15px;
  width: 75%;
  height: 60%;
  background-color: #000000a6;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  gap: 2px;
}

.warning-icon {
  width: 18px;
}

.warning-text {
  font-size: 14px;
  text-align: center;
}
</style>
