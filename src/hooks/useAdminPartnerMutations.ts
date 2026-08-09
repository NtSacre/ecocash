import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AdminPartnerService } from '@/application/services/AdminPartnerService'
import type { CreatePartnerDto } from '@/application/dto/AdminPartnerDto'

export function useAdminPartnerMutations() {
  const queryClient = useQueryClient()
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['admin', 'partners'] })

  const create = useMutation({
    mutationFn: (payload: CreatePartnerDto) => AdminPartnerService.create(payload),
    onSuccess: invalidate,
  })

  const update = useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: Partial<CreatePartnerDto> & { status?: string } }) =>
      AdminPartnerService.update(id, payload),
    onSuccess: invalidate,
  })

  const remove = useMutation({
    mutationFn: (id: number) => AdminPartnerService.remove(id),
    onSuccess: invalidate,
  })

  return { create, update, remove }
}