import { AdminListingRepository } from '@/infrastructure/repositories/AdminListingRepository'
import type { AdminCreateListingDto, AdminUpdateListingDto, RenewListingDto, AdminListingFilters } from '@/application/dto/AdminListingDto'

export const AdminListingService = {
  async listAll(filters?: AdminListingFilters) {
    return AdminListingRepository.getAll(filters)
  },
  async create(payload: AdminCreateListingDto) {
    return AdminListingRepository.create(payload)
  },
  async update(id: number | string, payload: AdminUpdateListingDto) {
    return AdminListingRepository.update(id, payload)
  },
  async remove(id: number | string) {
    return AdminListingRepository.delete(id)
  },
  async suspend(id: number | string) {
    return AdminListingRepository.suspend(id)
  },
  async renew(id: number | string, payload: RenewListingDto) {
    return AdminListingRepository.renew(id, payload)
  },
}