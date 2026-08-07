import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ResponseService } from '@/application/services/ResponseService'

interface SelectSlotPayload {
  responseId: number
  slotId: number
  date: string
}

export function useSelectSlot() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ responseId, slotId, date }: SelectSlotPayload) =>
      ResponseService.selectSlot(responseId, slotId, date),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['responses', 'mine'] }),
  })
}