import { useQuery } from '@tanstack/react-query'
import { AdminAssignmentService } from '@/application/services/AdminAssignmentService'

export function usePendingAssignments() {
  return useQuery({
    queryKey: ['admin', 'pending-assignments'],
    queryFn: () => AdminAssignmentService.listPending(),
  })
}