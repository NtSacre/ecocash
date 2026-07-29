import { useQuery } from '@tanstack/react-query'
import { CollectionSlotService } from '@/application/services/CollectionSlotService'

export function useCollectionSlots() {
  return useQuery({
    queryKey: ['collection-slots'],
    queryFn: () => CollectionSlotService.listAvailable(),
  })
}