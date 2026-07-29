import { apiClient } from '@/infrastructure/http/apiClient'
import type { ICollectionSlot } from '@/core/interfaces/ICollectionSlot'

export const CollectionSlotRepository = {
  async getAvailable(): Promise<ICollectionSlot[]> {
    const { data } = await apiClient.get<ICollectionSlot[]>('/collection-slots')
    return data
  },
}