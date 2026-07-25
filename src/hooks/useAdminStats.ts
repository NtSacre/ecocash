import { useQuery } from '@tanstack/react-query'
import { AdminStatsService } from '@/application/services/AdminStatsService'

export function useAdminStats() {
  return useQuery({
    queryKey: ['admin', 'stats'],
    queryFn: () => AdminStatsService.get(),
  })
}