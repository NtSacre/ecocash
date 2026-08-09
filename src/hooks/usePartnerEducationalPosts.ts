import { useQuery } from '@tanstack/react-query'
import { PartnerEducationalPostService } from '@/application/services/PartnerEducationalPostService'

export function usePartnerEducationalPosts() {
  return useQuery({
    queryKey: ['partner', 'educational-posts'],
    queryFn: () => PartnerEducationalPostService.listMine(),
  })
}