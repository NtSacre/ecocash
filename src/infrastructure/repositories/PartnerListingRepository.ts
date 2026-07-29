import { apiClient } from '@/infrastructure/http/apiClient'
import type { CreateListingDto, RenewListingDto, UpdateListingDto } from '@/application/dto/PartnerListingDto'
import type { IListing } from '@/core/interfaces/IListing'

export const PartnerListingRepository = {
  async getMine(): Promise<IListing[]> {
    const { data } = await apiClient.get<IListing[]>('/my-listings')
    return data
  },
  async create(payload: CreateListingDto): Promise<IListing> {
    const { data } = await apiClient.post<IListing>('/listings', payload)
    return data
  },
  async suspend(id: number): Promise<IListing> {
    const { data } = await apiClient.post<IListing>(`/listings/${id}/suspend`)
    return data
  },
  async renew(id: number, payload: RenewListingDto): Promise<IListing> {
    const { data } = await apiClient.post<IListing>(`/listings/${id}/renew`, payload)
    return data
  },

  async update(id: number, payload: UpdateListingDto): Promise<IListing> {
  const { data } = await apiClient.put<IListing>(`/listings/${id}`, payload)
  return data
},

async delete(id: number): Promise<void> {
  await apiClient.delete(`/listings/${id}`)
},
}