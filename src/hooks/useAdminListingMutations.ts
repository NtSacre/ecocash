import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AdminListingService } from '@/application/services/AdminListingService'
import type { AdminCreateListingDto, AdminUpdateListingDto, RenewListingDto } from '@/application/dto/AdminListingDto'

export function useAdminListingMutations() {
  const queryClient = useQueryClient()
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['admin', 'listings'] })

  const create = useMutation({
    mutationFn: (payload: AdminCreateListingDto) => AdminListingService.create(payload),
    onSuccess: invalidate,
  })

  const update = useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: AdminUpdateListingDto }) =>
      AdminListingService.update(id, payload),
    onSuccess: invalidate,
  })

  const remove = useMutation({
    mutationFn: (id: number) => AdminListingService.remove(id),
    onSuccess: invalidate,
  })

  const suspend = useMutation({
    mutationFn: (id: number) => AdminListingService.suspend(id),
    onSuccess: invalidate,
  })

  const renew = useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: RenewListingDto }) =>
      AdminListingService.renew(id, payload),
    onSuccess: invalidate,
  })

  return { create, update, remove, suspend, renew }
}