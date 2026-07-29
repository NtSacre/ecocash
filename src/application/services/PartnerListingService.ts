import { PartnerListingRepository } from '@/infrastructure/repositories/PartnerListingRepository'
import type { CreateListingDto, RenewListingDto, UpdateListingDto } from '@/application/dto/PartnerListingDto'

export const PartnerListingService = {
  async listMine() {
    return PartnerListingRepository.getMine()
  },
  async create(payload: CreateListingDto) {
    return PartnerListingRepository.create(payload)
  },
  async suspend(id: number) {
    return PartnerListingRepository.suspend(id)
  },
  async renew(id: number, payload: RenewListingDto) {
    return PartnerListingRepository.renew(id, payload)
  },

  async update(id: number, payload: UpdateListingDto) {
  return PartnerListingRepository.update(id, payload)
},

async delete(id: number) {
  return PartnerListingRepository.delete(id)
},
  
}