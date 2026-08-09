import { apiClient } from '@/infrastructure/http/apiClient'
import type { ICollection } from '@/core/interfaces/ICollection'

export const AgentCollectionRepository = {
  async getAssigned(): Promise<ICollection[]> {
    const { data } = await apiClient.get<ICollection[]>('/agent/collections')
    return data
  },
  async start(id: number): Promise<ICollection> {
    const { data } = await apiClient.post<ICollection>(`/collections/${id}/start`)
    return data
  },
  async confirm(id: number, quantityCollected: number): Promise<ICollection> {
    const { data } = await apiClient.post<ICollection>(`/collections/${id}/confirm`, {
      quantity_collected: quantityCollected,
    })
    return data
  },
  async deliver(id: number): Promise<ICollection> {
    const { data } = await apiClient.post<ICollection>(`/collections/${id}/deliver`)
    return data
  },
  
}