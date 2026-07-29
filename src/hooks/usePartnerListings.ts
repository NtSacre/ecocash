import { useQuery } from '@tanstack/react-query'
import { PartnerListingService } from '@/application/services/PartnerListingService'

export function usePartnerListings() {
  return useQuery({
    queryKey: ['partner', 'listings'],
    queryFn: () => PartnerListingService.listMine(),
  })
}