import { apiClient } from '@/infrastructure/http/apiClient'
import { RESPONSE_ROUTES } from '@/core/constants/listingRoutes'
import type { IListingResponse } from '@/core/interfaces/IListingResponse'

export const ResponseRepository = {
  async getMine(): Promise<IListingResponse[]> {
    const { data } = await apiClient.get<IListingResponse[]>(RESPONSE_ROUTES.MINE)
    return data
  },
  async create(listingId: number | string, quantityOffered: number): Promise<IListingResponse> {
    const { data } = await apiClient.post<IListingResponse>(RESPONSE_ROUTES.CREATE(listingId), {
      quantity_offered: quantityOffered,
    })
    return data
  },
  async selectSlot(responseId: number, collectionSlotId: number): Promise<IListingResponse> {
    const { data } = await apiClient.post<IListingResponse>(`/responses/${responseId}/select-slot`, {
      collection_slot_id: collectionSlotId,
    })
    return data
  },
}