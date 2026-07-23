import { useQuery } from '@tanstack/react-query'
import { ListingService } from '@/application/services/ListingService'

export function useListingDetail(id: number | string | undefined) {
  return useQuery({
    queryKey: ['listings', 'detail', id],
    queryFn: () => ListingService.getDetail(id as number | string),
    enabled: !!id,
  })
}
