import { useQuery } from '@tanstack/react-query'
import { PartnerProductService } from '@/application/services/PartnerProductService'

export function usePartnerProducts() {
  return useQuery({
    queryKey: ['partner', 'products'],
    queryFn: () => PartnerProductService.listMine(),
  })
}