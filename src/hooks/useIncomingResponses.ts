import { useQuery } from '@tanstack/react-query'
import { ResponseService } from '@/application/services/ResponseService'

export function useIncomingResponses(enabled = true) {
  return useQuery({
    queryKey: ['responses', 'incoming'],
    queryFn: () => ResponseService.listIncoming(),
    enabled,
  })
}