import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AdminCollectionSlotService } from '@/application/services/AdminCollectionSlotService'
import type { CreateCollectionSlotDto, UpdateCollectionSlotDto } from '@/application/dto/AdminCollectionSlotDto'

export function useAdminCollectionSlotMutations() {
  const queryClient = useQueryClient()
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['admin', 'collection-slots'] })

  const create = useMutation({
    mutationFn: (payload: CreateCollectionSlotDto) => AdminCollectionSlotService.create(payload),
    onSuccess: invalidate,
  })

  const update = useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: UpdateCollectionSlotDto }) =>
      AdminCollectionSlotService.update(id, payload),
    onSuccess: invalidate,
  })

  const remove = useMutation({
    mutationFn: (id: number) => AdminCollectionSlotService.remove(id),
    onSuccess: invalidate,
  })

  return { create, update, remove }
}