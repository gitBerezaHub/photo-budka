import type { NicePhoto } from './types.ts'

const chatId = import.meta.env.VITE_CHAT_ID
const userToken = import.meta.env.VITE_USER_TOKEN
const bearerToken = import.meta.env.VITE_BEARER_TOKEN

export async function createRequest(
  photosFormData: FormData
): Promise<string | undefined> {
  try {
    photosFormData.append('chatId', chatId)
    photosFormData.append('userToken', userToken)

    let requestOptions = {
      method: 'POST',
      body: photosFormData,
      redirect: 'follow',
      headers: {
        Authorization: bearerToken,
      },
    }
    let taskId
    await fetch(
      'https://bot.fotobudka.online/api/v1/avatarApp/create',
      requestOptions as RequestInit
    )
      .then((response) => response.json())
      .then((result) => {
        taskId = result.data.taskId
      })
      .catch((error) => console.log('error', error))

    return taskId
  } catch (error) {
    console.log('error', error)
  }
}

export async function checkTaskStatus(taskId: string): Promise<NicePhoto[]> {
  // Функция для выполнения запроса - вынесена, чтобы избежать дублирования кода
  const fetchTaskStatus = async (): Promise<{
    photos: NicePhoto[]
    hasProcessing: boolean
  }> => {
    try {
      const requestOptions = {
        method: 'GET',
        redirect: 'follow' as const,
        headers: {
          Authorization: bearerToken,
        },
      }

      const response = await fetch(
        `https://bot.fotobudka.online/api/v1/avatarApp/task/${taskId}?chatId=${chatId}&userToken=${userToken}`,
        requestOptions
      )
      const result = await response.json()

      const photos = result.data.photos
      const hasProcessing = photos.some(
        (photo: NicePhoto) => photo.status === 'processing'
      )

      return { photos, hasProcessing }
    } catch (error) {
      console.log('error', error)
      return { photos: [], hasProcessing: false }
    }
  }

  // Выполняем первый запрос немедленно
  const initialResult = await fetchTaskStatus()

  // Если нет фотографий в обработке, сразу возвращаем результат
  if (!initialResult.hasProcessing) {
    return initialResult.photos
  }

  // Если есть фотографии в обработке, продолжаем проверять с интервалом
  return new Promise((resolve) => {
    const interval = setInterval(async () => {
      const result = await fetchTaskStatus()

      if (!result.hasProcessing) {
        clearInterval(interval)
        resolve(result.photos)
      }
    }, 3000)
  })
}

export async function generateAvatar() {
  try {
    let formData = new FormData()
    formData.append('chatId', chatId)
    formData.append('userToken', userToken)

    let requestOptions = {
      method: 'POST',
      body: formData,
      redirect: 'follow',
      headers: {
        Authorization: bearerToken,
      },
    }
    let response
    await fetch(
        'https://bot.fotobudka.online/api/v1/avatarApp/generate', requestOptions as RequestInit)
        .then((response) => response.json())
        .then((result) => {
          response = result.data
        })
        .catch((error) => console.log('error', error))

    return response
  } catch (error) {
    console.log('error', error)
  }
}
