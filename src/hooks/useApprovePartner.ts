import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AdminPartnerService } from '@/application/services/AdminPartnerService'

export function useApprovePartner() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (userId: number) => AdminPartnerService.approve(userId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin', 'partners'] }),
  })
}