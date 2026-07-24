import { useQuery } from '@tanstack/react-query'
import { AdminListingService } from '@/application/services/AdminListingService'
import type { AdminListingFilters } from '@/application/dto/AdminListingDto'

export function useAdminListings(filters: AdminListingFilters = {}) {
  return useQuery({
    queryKey: ['admin', 'listings', filters],
    queryFn: () => AdminListingService.listAll(filters),
  })
}