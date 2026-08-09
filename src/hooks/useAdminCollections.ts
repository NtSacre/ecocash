import { useQuery } from '@tanstack/react-query'
import { AdminCollectionService } from '@/application/services/AdminCollectionService'
import type { CollectionStatus } from '@/core/interfaces/ICollection'

export function useAdminCollections(status?: CollectionStatus) {
  return useQuery({
    queryKey: ['admin', 'collections', status],
    queryFn: () => AdminCollectionService.listAll(status),
  })
}