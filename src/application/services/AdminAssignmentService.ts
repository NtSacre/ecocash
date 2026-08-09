import { AdminAssignmentRepository } from '@/infrastructure/repositories/AdminAssignmentRepository'

export const AdminAssignmentService = {
  async listPending() {
    return AdminAssignmentRepository.getPending()
  },
  async assign(responseId: number, agentId: number) {
    return AdminAssignmentRepository.assignAgent(responseId, agentId)
  },
  async retryAutoAssign() {
  return AdminAssignmentRepository.retryAutoAssign()
},
}