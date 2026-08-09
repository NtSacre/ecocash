import { apiClient } from '@/infrastructure/http/apiClient'
import type { ICollection, CollectionStatus } from '@/core/interfaces/ICollection'

export const AdminCollectionRepository = {
  async getAll(status?: CollectionStatus): Promise<ICollection[]> {
    const { data } = await apiClient.get<ICollection[]>('/admin/collections', {
      params: status ? { status } : {},
    })
    return data
  },
}