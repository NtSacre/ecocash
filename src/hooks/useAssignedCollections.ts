import { useQuery } from '@tanstack/react-query'
import { AgentCollectionService } from '@/application/services/AgentCollectionService'

export function useAssignedCollections() {
  return useQuery({
    queryKey: ['agent', 'collections'],
    queryFn: () => AgentCollectionService.listAssigned(),
  })
}