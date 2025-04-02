import type { Photo } from '../api/types.ts'

export function createPhotosFromFiles(
  files: File[],
  existingPhotosCount: number
): Photo[] {
  return Array.from(files).map((file, index) => {
    // Создаем URL для предпросмотра
    const url = URL.createObjectURL(file)

    // Для демонстрации: каждое 5-е фото помечаем как содержащее несколько людей
    const hasMultiplePeople = (existingPhotosCount + index + 1) % 5 === 0

    return {
      id: Date.now() + index,
      url,
      file,
      hasMultiplePeople,
    }
  })
}

export function cleanupPhotoURLs(photos: Photo[]): void {
  photos.forEach((photo) => {
    URL.revokeObjectURL(photo.url)
  })
}
