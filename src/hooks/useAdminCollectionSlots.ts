import { useQuery } from '@tanstack/react-query'
import { AdminCollectionSlotService } from '@/application/services/AdminCollectionSlotService'

export function useAdminCollectionSlots() {
  return useQuery({
    queryKey: ['admin', 'collection-slots'],
    queryFn: () => AdminCollectionSlotService.listAll(),
  })
}