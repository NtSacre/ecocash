import { useQuery } from '@tanstack/react-query'
import { ListingService } from '@/application/services/ListingService'

export function useActiveListings(page = 1) {
  return useQuery({
    queryKey: ['listings', 'active', page],
    queryFn: () => ListingService.listActive(page),
  })
}