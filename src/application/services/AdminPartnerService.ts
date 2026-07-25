import { AdminPartnerRepository } from '@/infrastructure/repositories/AdminPartnerRepository'
import type { CreatePartnerDto } from '../dto/AdminPartnerDto'

export const AdminPartnerService = {
  async listAll() {
    return AdminPartnerRepository.getAll()
  },
  async approve(userId: number) {
    return AdminPartnerRepository.approve(userId)
  },

  async create(payload: CreatePartnerDto) {
  return AdminPartnerRepository.create(payload)
},
}