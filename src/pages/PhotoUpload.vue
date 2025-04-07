<template>
  <Header @prev-page="prevPage" />
  <div class="wrapper">
    <div class="title-wrapper">
      <h2 class="title">Загрузите от 15 до 40 фото.</h2>
      <h3 v-if="!isGalleyOpened" class="sub-title">
        Чем больше, тем лучше сможет обучиться нейросеть.
      </h3>
    </div>
    <div v-if="!isGalleyOpened">
      <div class="emoji-wrapper">
        <img alt="" class="emoji" src="../assets/emoji.png" />
      </div>
      <div class="text-wrapper">
        <span class="text"
          >Не торопитесь. Можно сделать отдельный альбом, в медиатеке смартфона
          или облачном хранилище, куда вы аккуратно соберете ваши фотографии, а
          затем вернетесь сюда и добавите. Это единственная ваша задача перед
          тем как все станет очень просто и увлекательно!</span
        >
      </div>
      <AndroidButton v-bind="submitButton" @click="submit" />
      <AndroidButton v-bind="addPhotoButton" @click="openGallery" />
    </div>

    <PhotoSkeleton v-if="isInitialLoading" />

    <PhotoGrid
      v-else
      :photos="finalPhotos"
      @photo-click="openPhotoModal"
      @photo-delete="deletePhoto" />

    <div v-if="isGalleyOpened" class="gallery-footer">
      <div class="top-row">
        <div class="photo-count">
          <HalfCircleSpinner
              v-if="isInitialLoading"
              :animation-duration="1000"
              :size="22"
              color="#2990FF" />
          <p v-else>{{ finalPhotos?.filter((p) => p.status !== 'error').length }} фото</p>
        </div>
        <AndroidButton v-bind="addMoreButton" @click="openGallery" class="add-more-button" style="margin-top: 0;"/>
      </div>
      <AndroidButton v-bind="finishButton" @click="generateAvatar" class="finish-button" style="margin-top: 0;" />
    </div>

    <PhotoModal
      v-if="selectedPhoto"
      :photo="selectedPhoto"
      @close="closePhotoModal"
      @delete="deleteSelectedPhoto" />

    <input
      ref="fileInput"
      accept="image/*"
      multiple
      style="display: none"
      type="file"
      @change="handleFileSelect" />
  </div>
</template>

<script lang="ts" setup>
import {computed, onBeforeUnmount, onMounted, reactive, ref} from 'vue'
import PhotoModal from '../components/PhotoModal.vue'
import PhotoGrid from '../components/PhotoGrid.vue'
import type { IPhoto } from '../api/types.ts'
import AndroidButton from '../components/AndroidButton.vue'
import Header from '../widgets/Header.vue'
import router from '../router'
import {
  checkTaskStatus,
  createRequest,
  generateAvatar,
} from '../api/photosAPI.ts'
import PhotoSkeleton from '../components/PhotoSkeleton.vue'
import { HalfCircleSpinner } from 'epic-spinners'

const prevPage = () => router.back()

interface IButton {
  text?: string
  background?: string
  color?: string
  isDisabled?: boolean
  margin?: number
  isThin?: boolean
}

const submitButton: IButton = reactive({
  text: 'Все понятно!',
  background: '#32E55E',
  color: '#000000',
  margin: 90,
})

const addPhotoButton: IButton = reactive({
  text: 'Добавить фото',
  background: '#222222',
  color: '#FFFFFF66',
  isDisabled: true,
})

const addMoreButton: IButton = reactive({
  text: 'Добавить еще',
  background: '#2a2a2a',
  color: '#fff',
  margin: 90,
  isThin: true,
})

const finishButton = computed(() => {
  let photosAmount = finalPhotos.value?.filter((p) => p.status !== 'error').length
  if (photosAmount < 15 || photosAmount > 40) {
    return {
      text: 'Завершить',
      background: '#252525',
      color: '##FFFFFF14',
      isDisabled: true
    }
  } else {
    return {
      text: 'Завершить',
      background: '#3b82f6',
      color: '#fff',
    }
  }
})

const submit = () => {
  submitButton.background = '#222222'
  submitButton.color = '#32E55E'
  submitButton.isDisabled = true

  addPhotoButton.background = '#2990FF'
  addPhotoButton.color = '#fff'
  addPhotoButton.isDisabled = false
}

const isInitialLoading = ref(false)
const isGalleyOpened = ref(false)

const fileInput = ref<HTMLInputElement | null>(null)

const finalPhotos = ref<IPhoto[]>([])
const selectedPhoto = ref<IPhoto | null>(null)
const photoWithWarning = ref<IPhoto | null>(null)
const photosFormData = new FormData()

const openGallery = () => {
  fileInput.value?.click()
  isGalleyOpened.value = true
}

const handleFileSelect = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const files = target.files

  if (!files || files.length === 0) return

  try {
    isInitialLoading.value = true

    Array.from(files).forEach((file) => {
      photosFormData.append('photo[]', file, file.name)
    })

    let taskID
    let rawPhotos
    const result = await createRequest(photosFormData)
    if (result) {
      const { taskId, photos } = result
      taskID = taskId
      rawPhotos = photos
    }
    if (!taskID) {
      console.error('Не удалось создать задачу для обработки фотографий')
      return
    }
    finalPhotos.value = rawPhotos ? rawPhotos : []
    isInitialLoading.value = false

    const processedPhotos = await checkTaskStatus(taskID)

    finalPhotos.value = [...processedPhotos]

    target.value = ''
  } catch (error) {
    console.error('Ошибка при загрузке фотографий:', error)
  }
}

const openPhotoModal = (photo: IPhoto) => {
  selectedPhoto.value = photo
}

const closePhotoModal = () => {
  selectedPhoto.value = null
}

const deletePhoto = (photo: IPhoto) => {
  finalPhotos.value = finalPhotos?.value.filter((p) => p.id !== photo.id)

  if (selectedPhoto.value?.id === photo.id) {
    selectedPhoto.value = null
  }

  if (photoWithWarning.value?.id === photo.id) {
    photoWithWarning.value = null
  }
}

const deleteSelectedPhoto = (photo: IPhoto) => {
  deletePhoto(photo)
  selectedPhoto.value = null
}

function cleanupPhotoURLs(photos: IPhoto[]): void {
  photos.forEach((photo) => {
    URL.revokeObjectURL(photo.url)
  })
}

onMounted(() => {
  const cleanupHandler = () => cleanupPhotoURLs(finalPhotos.value)
  window.addEventListener('beforeunload', cleanupHandler)
})

onBeforeUnmount(() => {
  cleanupPhotoURLs(finalPhotos.value)

  const cleanupHandler = () => cleanupPhotoURLs(finalPhotos.value)
  window.removeEventListener('beforeunload', cleanupHandler)
})
</script>

<style scoped>
.wrapper {
  width: calc(100vw - 2 * 18px);
  padding-top: 10px;
  display: flex;
  flex-direction: column;
}

.title-wrapper {
  height: 48px;
  width: inherit;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.title {
  font-weight: 700;
  font-size: 17px;
  line-height: 22px;
  letter-spacing: -0.43px;
  text-align: center;
  vertical-align: middle;
}

.sub-title {
  font-weight: 510;
  font-size: 15px;
  line-height: 22px;
  letter-spacing: -0.43px;
  text-align: center;
  vertical-align: middle;
}

.emoji-wrapper {
  width: inherit;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.text {
  font-weight: 400;
  font-size: 15px;
  line-height: 20px;
  letter-spacing: -0.43px;
  vertical-align: middle;
}

.gallery-header h2 {
  font-size: 18px;
  font-weight: 500;
  margin: 0;
}

.gallery-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  background: #0f0f0f;
  padding: 18px;
  border-top: 1px solid #333;
  display: flex;
  flex-direction: column;
}

.top-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  width: 100%;
}

.photo-count {
  color: #3b82f6;
  font-weight: 600;
  font-size: 17px;
  line-height: 22px;
  width: 115px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.finish-button {
  width: 100%;
}
</style>
