import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AdminAssignmentService } from '@/application/services/AdminAssignmentService'

export function useAssignAgent() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ responseId, agentId }: { responseId: number; agentId: number }) =>
      AdminAssignmentService.assign(responseId, agentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'pending-assignments'] })
      queryClient.invalidateQueries({ queryKey: ['admin', 'collections'] })
    },
  })
}