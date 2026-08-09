import { AgentCollectionRepository } from '@/infrastructure/repositories/AgentCollectionRepository'

export const AgentCollectionService = {
  async listAssigned() {
    return AgentCollectionRepository.getAssigned()
  },
  async start(id: number) {
    return AgentCollectionRepository.start(id)
  },
  async confirm(id: number, quantityCollected: number) {
    return AgentCollectionRepository.confirm(id, quantityCollected)
  },
  async deliver(id: number) {
    return AgentCollectionRepository.deliver(id)
  },
}