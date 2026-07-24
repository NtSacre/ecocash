import { useQuery } from '@tanstack/react-query'
import { ResponseService } from '@/application/services/ResponseService'

export function useMyResponses(enabled = true) {
  return useQuery({
    queryKey: ['responses', 'mine'],
    queryFn: () => ResponseService.listMine(),
    enabled,
  })
}