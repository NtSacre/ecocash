import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AdminAgentService } from '@/application/services/AdminAgentService'
import type { CreateAgentDto } from '@/application/dto/AdminAgentDto'

export function useAdminAgentMutations() {
  const queryClient = useQueryClient()
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['admin', 'agents'] })

  const create = useMutation({
    mutationFn: (payload: CreateAgentDto) => AdminAgentService.create(payload),
    onSuccess: invalidate,
  })

  const update = useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: Partial<CreateAgentDto> & { status?: string } }) =>
      AdminAgentService.update(id, payload),
    onSuccess: invalidate,
  })

  const remove = useMutation({
    mutationFn: (id: number) => AdminAgentService.remove(id),
    onSuccess: invalidate,
  })

  return { create, update, remove }
}