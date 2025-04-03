<template>
  <div
    class="photo-item"
    @click="photo.status !== 'processing' && $emit('click', photo)">
    <img :src="photo.url" alt="Фото" class="photo-thumbnail" />

    <div
      class="delete-icon"
      @click.stop="$emit('delete', photo)"
      v-if="photo.status !== 'processing'">
      <img alt="" src="../assets/delete.svg" />
    </div>

    <div
      v-if="photo.status === 'finished'"
      class="checkmark-icon">
      <img alt="" src="../assets/checkmark.svg" />
    </div>

    <div v-if="photo.status === 'error'" class="multiple-people-warning">
      <img alt="" class="warning-icon" src="../assets/warning.svg" />
      <div class="warning-text">{{ warningText }}</div>
    </div>

    <div v-if="photo.status === 'processing'" class="validation-overlay">
      <HalfCircleSpinner
        :animation-duration="1000"
        :size="24"
        color="#2990FF" />
      <div class="validation-text">Проверка</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { NicePhoto } from '../api/types.ts'
import { HalfCircleSpinner } from 'epic-spinners'
import {computed} from "vue";

const { photo } = defineProps<{
  photo: NicePhoto
}>()

interface ValidationMessage {
  key: keyof NicePhoto['validationResult']
  message: string
}

const validationMessages: ValidationMessage[] = [
  { key: 'isEyesClosed', message: 'Глаза закрыты' },
  { key: 'withGlasses', message: 'Есть очки' },
  { key: 'isFaceSmall', message: 'Маленькое лицо' },
  { key: 'isProfile', message: 'Профиль' },
  { key: 'isHalfProfile', message: 'Полу-профиль' },
  { key: 'faceNotFound', message: 'Лицо не найдено' },
  { key: 'badFileFormat', message: 'Ошибка файла' },
]

const warningText = computed(() => {
  if (photo.status === 'error') {
    return validationMessages.find((msg) => photo.validationResult[msg.key])?.message || '';
  }
  return '';
});

defineEmits<{
  (e: 'click', photo: NicePhoto): void
  (e: 'delete', photo: NicePhoto): void
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
}

.delete-icon {
  top: 8px;
  right: 8px;
  width: 16px;
  height: 16px;
  cursor: pointer;
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

.validation-overlay {
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
  gap: 6px;
  border-radius: 8px;
}

.validation-text {
  font-size: 14px;
  color: white;
  font-weight: 500;
}
</style>
