import { useQuery } from '@tanstack/react-query'
import { MaterialRepository } from '@/infrastructure/repositories/MaterialRepository'

export function useMaterials() {
  return useQuery({
    queryKey: ['materials'],
    queryFn: () => MaterialRepository.getAll(),
  })
}