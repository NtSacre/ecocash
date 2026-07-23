import { ListingRepository } from '@/infrastructure/repositories/ListingRepository'

export const ListingService = {
  async listActive(page = 1) {
    return ListingRepository.getActive(page)
  },
  async getDetail(id: number | string) {
    return ListingRepository.getById(id)
  },
}