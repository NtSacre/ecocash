import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ResponseService } from '@/application/services/ResponseService'

export function useSelectSlot() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ responseId, slotId }: { responseId: number; slotId: number }) =>
      ResponseService.selectSlot(responseId, slotId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['responses', 'mine'] }),
  })
}