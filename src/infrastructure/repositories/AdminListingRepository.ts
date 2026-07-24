import { apiClient } from '@/infrastructure/http/apiClient'
import { ADMIN_LISTING_ROUTES } from '@/core/constants/adminListingRoutes'
import type { AdminCreateListingDto, AdminUpdateListingDto, RenewListingDto, AdminListingFilters } from '@/application/dto/AdminListingDto'
import type { IListing } from '@/core/interfaces/IListing'
import type { IPaginatedResponse } from '@/core/interfaces/IPaginatedResponse'

export const AdminListingRepository = {
  async getAll(filters: AdminListingFilters = {}): Promise<IPaginatedResponse<IListing>> {
    const { data } = await apiClient.get<IPaginatedResponse<IListing>>(ADMIN_LISTING_ROUTES.ALL, {
      params: filters,
    })
    return data
  },
  async create(payload: AdminCreateListingDto): Promise<IListing> {
    const { data } = await apiClient.post<IListing>(ADMIN_LISTING_ROUTES.CREATE, payload)
    return data
  },
  async update(id: number | string, payload: AdminUpdateListingDto): Promise<IListing> {
    const { data } = await apiClient.put<IListing>(ADMIN_LISTING_ROUTES.UPDATE(id), payload)
    return data
  },
  async delete(id: number | string): Promise<void> {
    await apiClient.delete(ADMIN_LISTING_ROUTES.DELETE(id))
  },
  async suspend(id: number | string): Promise<IListing> {
    const { data } = await apiClient.post<IListing>(ADMIN_LISTING_ROUTES.SUSPEND(id))
    return data
  },
  async renew(id: number | string, payload: RenewListingDto): Promise<IListing> {
    const { data } = await apiClient.post<IListing>(ADMIN_LISTING_ROUTES.RENEW(id), payload)
    return data
  },
}