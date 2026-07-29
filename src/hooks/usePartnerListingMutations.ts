import { useMutation, useQueryClient } from '@tanstack/react-query'
import { PartnerListingService } from '@/application/services/PartnerListingService'
import type { CreateListingDto, RenewListingDto, UpdateListingDto } from '@/application/dto/PartnerListingDto'

export function usePartnerListingMutations() {
  const queryClient = useQueryClient()
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['partner', 'listings'] })

  const create = useMutation({
    mutationFn: (payload: CreateListingDto) => PartnerListingService.create(payload),
    onSuccess: invalidate,
  })

  const suspend = useMutation({
    mutationFn: (id: number) => PartnerListingService.suspend(id),
    onSuccess: invalidate,
  })

  const renew = useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: RenewListingDto }) => PartnerListingService.renew(id, payload),
    onSuccess: invalidate,
  })

  const update = useMutation({
  mutationFn: ({
    id,
    payload,
  }: {
    id: number
    payload: UpdateListingDto
  }) => PartnerListingService.update(id, payload),

  onSuccess: invalidate,
})

const remove = useMutation({
  mutationFn: (id: number) =>
    PartnerListingService.delete(id),

  onSuccess: invalidate,
})

  return {
  create,
  update,
  remove,
  suspend,
  renew,
}
}