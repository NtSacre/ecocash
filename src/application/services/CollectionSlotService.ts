import { CollectionSlotRepository } from '@/infrastructure/repositories/CollectionSlotRepository'

export const CollectionSlotService = {
  async listAvailable() {
    return CollectionSlotRepository.getAvailable()
  },
}