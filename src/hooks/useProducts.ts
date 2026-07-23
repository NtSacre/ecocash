import { useQuery } from '@tanstack/react-query'
import { ProductService } from '@/application/services/ProductService'

export function useProducts(page = 1) {
  return useQuery({
    queryKey: ['products', page],
    queryFn: () => ProductService.listAvailableProducts(page),
  })
}