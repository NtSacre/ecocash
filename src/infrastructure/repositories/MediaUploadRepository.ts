import { apiClient } from '@/infrastructure/http/apiClient'

export const MediaUploadRepository = {
  async uploadImage(file: File): Promise<string> {
    const formData = new FormData()
    formData.append('file', file)
    const { data } = await apiClient.post<{ url: string }>('/uploads/image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return data.url
  },
  async uploadVideo(file: File): Promise<string> {
    const formData = new FormData()
    formData.append('file', file)
    const { data } = await apiClient.post<{ url: string }>('/uploads/video', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return data.url
  },
}