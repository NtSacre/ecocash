import { apiClient } from '@/infrastructure/http/apiClient'
import type { IAdminStats } from '@/core/interfaces/IAdminStats'

export const AdminStatsRepository = {
  async get(): Promise<IAdminStats> {
    const { data } = await apiClient.get<IAdminStats>('/admin/stats')
    return data
  },
}