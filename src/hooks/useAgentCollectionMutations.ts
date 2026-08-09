import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AgentCollectionService } from '@/application/services/AgentCollectionService'

export function useAgentCollectionMutations() {
  const queryClient = useQueryClient()
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['agent', 'collections'] })

  const start = useMutation({
    mutationFn: (id: number) => AgentCollectionService.start(id),
    onSuccess: invalidate,
  })

  const confirm = useMutation({
    mutationFn: ({ id, quantity }: { id: number; quantity: number }) => AgentCollectionService.confirm(id, quantity),
    onSuccess: invalidate,
  })

  const deliver = useMutation({
    mutationFn: (id: number) => AgentCollectionService.deliver(id),
    onSuccess: invalidate,
  })

  return { start, confirm, deliver }
}