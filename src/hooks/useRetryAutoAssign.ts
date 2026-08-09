import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AdminAssignmentService } from '@/application/services/AdminAssignmentService'

interface StillPendingItem {
  response_id: number
  listing_title: string
  reason: string
}

interface RetryAutoAssignResult {
  message: string
  assigned_count: number
  still_pending: StillPendingItem[]
}

export function useRetryAutoAssign() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => AdminAssignmentService.retryAutoAssign() as Promise<RetryAutoAssignResult>,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'pending-assignments'] })
      queryClient.invalidateQueries({ queryKey: ['admin', 'collections'] })
    },
  })
}