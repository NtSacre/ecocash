import { useQuery } from '@tanstack/react-query'
import { AdminAgentService } from '@/application/services/AdminAgentService'

export function useAdminAgents() {
  return useQuery({
    queryKey: ['admin', 'agents'],
    queryFn: () => AdminAgentService.listAll(),
  })
}