import { apiClient } from '@/infrastructure/http/apiClient'
import type { CreateEducationalPostDto, UpdateEducationalPostDto } from '@/application/dto/PartnerEducationalPostDto'
import type { IEducationalPost } from '@/core/interfaces/IEducationalPost'

export const PartnerEducationalPostRepository = {
  async getMine(): Promise<IEducationalPost[]> {
    const { data } = await apiClient.get<IEducationalPost[]>('/my-educational-posts')
    return data
  },
  async create(payload: CreateEducationalPostDto): Promise<IEducationalPost> {
    const { data } = await apiClient.post<IEducationalPost>('/educational-posts', payload)
    return data
  },
  async update(id: number, payload: UpdateEducationalPostDto): Promise<IEducationalPost> {
    const { data } = await apiClient.put<IEducationalPost>(`/educational-posts/${id}`, payload)
    return data
  },
  async remove(id: number): Promise<void> {
    await apiClient.delete(`/educational-posts/${id}`)
  },
}