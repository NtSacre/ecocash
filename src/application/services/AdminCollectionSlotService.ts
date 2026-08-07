import { AdminCollectionSlotRepository } from '@/infrastructure/repositories/AdminCollectionSlotRepository'
import type { CreateCollectionSlotDto, UpdateCollectionSlotDto } from '@/application/dto/AdminCollectionSlotDto'

export const AdminCollectionSlotService = {
  async listAll() {
    return AdminCollectionSlotRepository.getAll()
  },
  async create(payload: CreateCollectionSlotDto) {
    return AdminCollectionSlotRepository.create(payload)
  },
  async update(id: number, payload: UpdateCollectionSlotDto) {
    return AdminCollectionSlotRepository.update(id, payload)
  },
  async remove(id: number) {
    return AdminCollectionSlotRepository.delete(id)
  },
}