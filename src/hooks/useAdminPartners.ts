import { useQuery } from '@tanstack/react-query'
import { AdminPartnerRepository } from '@/infrastructure/repositories/AdminPartnerRepository'

export function useAdminPartners() {
  return useQuery({
    queryKey: ['admin', 'partners'],
    queryFn: () => AdminPartnerRepository.getAll(),
  })
}