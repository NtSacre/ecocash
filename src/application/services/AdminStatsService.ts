import { AdminStatsRepository } from '@/infrastructure/repositories/AdminStatsRepository'

export const AdminStatsService = {
  async get() {
    return AdminStatsRepository.get()
  },
}