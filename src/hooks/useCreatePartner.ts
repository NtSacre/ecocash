import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AdminPartnerService } from '@/application/services/AdminPartnerService'

export function useCreatePartner() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: AdminPartnerService.create,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin', 'partners'] }),
  })
}