import { apiClient } from '@/infrastructure/http/apiClient'
import type { IListingResponse } from '@/core/interfaces/IListingResponse'

export const AdminAssignmentRepository = {
  async getPending(): Promise<IListingResponse[]> {
    const { data } = await apiClient.get<IListingResponse[]>('/admin/responses/pending-assignment')
    return data
  },
  async assignAgent(responseId: number, agentId: number): Promise<void> {
    await apiClient.post(`/admin/responses/${responseId}/assign-agent`, { agent_id: agentId })
  },

  async retryAutoAssign() {
  const { data } = await apiClient.post('/admin/responses/retry-auto-assign')
  return data
},
}