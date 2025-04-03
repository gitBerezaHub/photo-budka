import type { IPhoto } from './types.ts'

const chatId = import.meta.env.VITE_CHAT_ID
const userToken = import.meta.env.VITE_USER_TOKEN
const bearerToken = import.meta.env.VITE_BEARER_TOKEN

interface CreateRequestResult {
  taskId: string | undefined
  photos: IPhoto[] | undefined
}

export async function createRequest(
  photosFormData: FormData
): Promise<CreateRequestResult | undefined> {
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
    let photos
    await fetch(
      'https://bot.fotobudka.online/api/v1/avatarApp/create',
      requestOptions as RequestInit
    )
      .then((response) => response.json())
      .then((result) => {
        taskId = result.data.taskId
        photos = result.data.photos
      })
      .catch((error) => console.log('error', error))

    return { taskId, photos }
  } catch (error) {
    console.log('error', error)
  }
}

export async function checkTaskStatus(taskId: string): Promise<IPhoto[]> {
  const fetchTaskStatus = async (): Promise<{
    photos: IPhoto[]
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
        (photo: IPhoto) => photo.status === 'processing'
      )

      return { photos, hasProcessing }
    } catch (error) {
      console.log('error', error)
      return { photos: [], hasProcessing: false }
    }
  }

  const initialResult = await fetchTaskStatus()

  if (!initialResult.hasProcessing) {
    return initialResult.photos
  }

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
      'https://bot.fotobudka.online/api/v1/avatarApp/generate',
      requestOptions as RequestInit
    )
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
