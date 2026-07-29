import { useMutation, useQueryClient } from '@tanstack/react-query'
import { PartnerProductService } from '@/application/services/PartnerProductService'

export function useUpdateProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: any }) =>
      PartnerProductService.update(id, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['partner', 'products'],
      })
    },
  })
}