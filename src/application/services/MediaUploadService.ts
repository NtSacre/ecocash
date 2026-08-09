import { MediaUploadRepository } from '@/infrastructure/repositories/MediaUploadRepository'

export const MediaUploadService = {
  async uploadImage(file: File) {
    return MediaUploadRepository.uploadImage(file)
  },
  async uploadVideo(file: File) {
    return MediaUploadRepository.uploadVideo(file)
  },
}