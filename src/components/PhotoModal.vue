<template>
  <div class="photo-modal">
    <div class="modal-content" @click="$emit('close')">
      <div class="modal-image-container" @click.stop>
        <img :src="photo.url" alt="Увеличенное фото" class="modal-image" />

        <!-- Кнопка удаления для обычных фото (справа вверху) -->
        <button
          v-if="!hasValidationIssue"
          class="modal-close"
          @click="$emit('delete', photo)">
          <span>Удалить</span>
          <img alt="" src="../assets/delete.svg" />
        </button>

        <!-- Предупреждение для фото с несколькими людьми -->
        <div v-if="hasValidationIssue">
          <div class="warning-content">
            <img alt="" class="warning-icon" src="../assets/warning.svg" />
            <div class="warning-text">
              <div class="warning-title">{{ warningText }}</div>
              <div class="warning-message">
                Эта фотография не может быть отправлена
              </div>
            </div>
          </div>
        </div>

        <!-- Кнопка удаления для фото с несколькими людьми (внизу) -->
        <button
          v-if="hasValidationIssue"
          class="modal-delete-btn"
          @click="$emit('delete', photo)">
          Удалить
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { IPhoto } from '../api/types.ts'

const { photo } = defineProps<{
  photo: IPhoto
}>()

interface ValidationMessage {
  key: keyof IPhoto['validationResult']
  message: string
}

const validationMessages: ValidationMessage[] = [
  { key: 'isEyesClosed', message: 'Глаза на фотографии закрыты' },
  { key: 'withGlasses', message: 'На фотографии присутствуют очки' },
  { key: 'isFaceSmall', message: 'Лицо на фотографии слишком маленькое' },
  { key: 'isProfile', message: 'Фотография сделана в профиль' },
  { key: 'isHalfProfile', message: 'Фотография сделана в полу-профиль' },
  { key: 'faceNotFound', message: 'Лицо на фотографии не найдено' },
  { key: 'badFileFormat', message: 'Неверный формат файла' },
]

const hasValidationIssue = Object.values(photo.validationResult).some(Boolean)
const warningText = hasValidationIssue
  ? validationMessages.find((msg) => photo.validationResult[msg.key])
      ?.message || ''
  : ''

defineEmits<{
  (e: 'close'): void
  (e: 'delete', photo: IPhoto): void
}>()
</script>

<style scoped>
.photo-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #00000080;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.modal-content {
  position: relative;
  width: 92%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: 90vh;
  justify-content: center;
}

.modal-image-container {
  position: relative;
  width: 100%;
  height: 70%;
  border-radius: 12px;
  overflow: hidden;
}

.modal-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.modal-close {
  position: absolute;
  top: 16px;
  right: 16px;
  background-color: #ffffff66;
  border: none;
  border-radius: 16px;
  padding: 6px 12px;
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  font-size: 15px;
  line-height: 20px;
}

.warning-content {
  position: absolute;
  bottom: 72px;
  left: 16px;
  right: 16px;
  background-color: #000000a6;
  backdrop-filter: blur(100px);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
  height: 64px;
  border-radius: 8px;
  gap: 6px;
  padding: 16px 10px;
}

.warning-icon {
  width: 18px;
}

.warning-text {
  font-weight: 400;
  font-size: 11px;
  line-height: 13px;
  letter-spacing: 0.06px;
  text-align: center;
  vertical-align: middle;
}

.modal-delete-btn {
  position: absolute;
  bottom: 16px;
  left: 16px;
  right: 16px;
  border: none;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  width: 91%;
  height: 48px;
  border-radius: 20px;
  padding: 8px 12px;
  background-color: #ffffffa6;
  backdrop-filter: blur(100px);
}
</style>
