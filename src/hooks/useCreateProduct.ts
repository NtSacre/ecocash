import { useMutation, useQueryClient } from '@tanstack/react-query'
import { PartnerProductService } from '@/application/services/PartnerProductService'

export function useCreateProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: PartnerProductService.create,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['partner', 'products'] }),
  })
}