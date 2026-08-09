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
  async selectSlot(
  responseId: number,
  collectionSlotId: number,
  collectionDate: string
): Promise<{ response: IListingResponse; auto_assigned: boolean }> {
  const { data } = await apiClient.post<{ response: IListingResponse; auto_assigned: boolean }>(
    `/responses/${responseId}/select-slot`,
    { collection_slot_id: collectionSlotId, collection_date: collectionDate }
  )
  return data
},

async getIncoming(): Promise<IListingResponse[]> {
  const { data } = await apiClient.get<IListingResponse[]>('/my-listings-responses')
  return data
},
}