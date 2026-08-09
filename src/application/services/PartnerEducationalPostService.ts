import { PartnerEducationalPostRepository } from '@/infrastructure/repositories/PartnerEducationalPostRepository'
import type { CreateEducationalPostDto, UpdateEducationalPostDto } from '@/application/dto/PartnerEducationalPostDto'

export const PartnerEducationalPostService = {
  async listMine() {
    return PartnerEducationalPostRepository.getMine()
  },
  async create(payload: CreateEducationalPostDto) {
    return PartnerEducationalPostRepository.create(payload)
  },
  async update(id: number, payload: UpdateEducationalPostDto) {
    return PartnerEducationalPostRepository.update(id, payload)
  },
  async remove(id: number) {
    return PartnerEducationalPostRepository.remove(id)
  },
}