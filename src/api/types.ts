export interface IPhoto {
  id: number
  photoIndex: number
  url: string
  status: 'finished' | 'error' | 'processing'
  validationResult: {
    withGlasses: boolean
    isFaceSmall: boolean
    isEyesClosed: boolean
    isProfile: boolean
    isHalfProfile: boolean
    faceNotFound: boolean
    badFileFormat: boolean
  }
}
