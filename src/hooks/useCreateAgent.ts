import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AdminAgentService } from '@/application/services/AdminAgentService'

export function useCreateAgent() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: AdminAgentService.create,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin', 'agents'] }),
  })
}