import { useQuery } from '@tanstack/react-query'
import { ResponseService } from '@/application/services/ResponseService'

export function useMyResponses() {
  return useQuery({
    queryKey: ['responses', 'mine'],
    queryFn: () => ResponseService.listMine(),
  })
}