<template>
  <div class="photos-grid">
    <PhotoItem
      v-for="photo in photos"
      :key="photo.id"
      :photo="photo"
      @click="$emit('photo-click', photo)"
      @delete="$emit('photo-delete', photo)" />
  </div>
</template>

<script lang="ts" setup>
import PhotoItem from './PhotoItem.vue'
import type { IPhoto } from '../api/types.ts'

defineProps<{
  photos?: IPhoto[]
}>()

defineEmits<{
  (e: 'photo-click', photo: IPhoto): void
  (e: 'photo-delete', photo: IPhoto): void
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
