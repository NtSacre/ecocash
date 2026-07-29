import { useMutation, useQueryClient } from '@tanstack/react-query'
import { PartnerProductService } from '@/application/services/PartnerProductService'

export function useDeleteProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => PartnerProductService.delete(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['partner', 'products'],
      })
    },
  })
}