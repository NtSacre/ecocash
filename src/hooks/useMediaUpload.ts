import { useMutation } from '@tanstack/react-query'
import { MediaUploadService } from '@/application/services/MediaUploadService'

export function useImageUpload() {
  return useMutation({
    mutationFn: (file: File) => MediaUploadService.uploadImage(file),
  })
}

export function useVideoUpload() {
  return useMutation({
    mutationFn: (file: File) => MediaUploadService.uploadVideo(file),
  })
}