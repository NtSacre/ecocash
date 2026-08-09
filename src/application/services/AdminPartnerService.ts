import { AdminPartnerRepository } from '@/infrastructure/repositories/AdminPartnerRepository'
import type { CreatePartnerDto } from '@/application/dto/AdminPartnerDto'

export const AdminPartnerService = {
  async listAll() {
    return AdminPartnerRepository.getAll()
  },
  async create(payload: CreatePartnerDto) {
    return AdminPartnerRepository.create(payload)
  },
  async update(id: number, payload: Partial<CreatePartnerDto> & { status?: string }) {
    return AdminPartnerRepository.update(id, payload)
  },
  async remove(id: number) {
    return AdminPartnerRepository.remove(id)
  },
  async approve(userId: number) {
    return AdminPartnerRepository.approve(userId)
  },
}