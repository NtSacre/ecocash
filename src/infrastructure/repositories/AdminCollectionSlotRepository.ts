import { apiClient } from '@/infrastructure/http/apiClient'
import type { CreateCollectionSlotDto, UpdateCollectionSlotDto } from '@/application/dto/AdminCollectionSlotDto'
import type { ICollectionSlot } from '@/core/interfaces/ICollectionSlot'

export const AdminCollectionSlotRepository = {
  async getAll(): Promise<ICollectionSlot[]> {
    const { data } = await apiClient.get<ICollectionSlot[]>('/admin/collection-slots')
    return data
  },
  async create(payload: CreateCollectionSlotDto): Promise<ICollectionSlot> {
    const { data } = await apiClient.post<ICollectionSlot>('/admin/collection-slots', payload)
    return data
  },
  async update(id: number, payload: UpdateCollectionSlotDto): Promise<ICollectionSlot> {
    const { data } = await apiClient.put<ICollectionSlot>(`/admin/collection-slots/${id}`, payload)
    return data
  },
  async delete(id: number): Promise<void> {
    await apiClient.delete(`/admin/collection-slots/${id}`)
  },
}