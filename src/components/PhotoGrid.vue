<template>
  <div class="photos-grid">
    <PhotoItem
      v-for="(photo, index) in photos"
      :key="index"
      :photo="photo"
      @click="$emit('photo-click', photo)"
      @delete="$emit('photo-delete', photo)" />
  </div>
</template>

<script setup lang="ts">
import PhotoItem from './PhotoItem.vue'
import type { Photo } from '../api/types.ts'

defineProps<{
  photos: Photo[]
}>()

defineEmits<{
  (e: 'photo-click', photo: Photo): void
  (e: 'photo-delete', photo: Photo): void
}>()
</script>

<style scoped>
.photos-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 13px;
  overflow-y: auto;
  flex: 1;
  margin-bottom: 200px;
}
</style>
