import { AdminCollectionRepository } from '@/infrastructure/repositories/AdminCollectionRepository'
import type { CollectionStatus } from '@/core/interfaces/ICollection'

export const AdminCollectionService = {
  async listAll(status?: CollectionStatus) {
    return AdminCollectionRepository.getAll(status)
  },
}