import { apiClient } from '@/infrastructure/http/apiClient'
import { LISTING_ROUTES } from '@/core/constants/listingRoutes'
import type { IListing } from '@/core/interfaces/IListing'
import type { IPaginatedResponse } from '@/core/interfaces/IPaginatedResponse'

export const ListingRepository = {
  async getActive(page = 1): Promise<IPaginatedResponse<IListing>> {
    const { data } = await apiClient.get<IPaginatedResponse<IListing>>(LISTING_ROUTES.ACTIVE, {
      params: { page },
    })
    return data
  },
  async getById(id: number | string): Promise<IListing> {
    const { data } = await apiClient.get<IListing>(LISTING_ROUTES.DETAIL(id))
    return data
  },
}