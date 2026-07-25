import { apiClient } from '@/infrastructure/http/apiClient'
import type { CreateAgentDto } from '@/application/dto/AdminAgentDto'
import type { IUser } from '@/core/interfaces/IUser'

export const AdminAgentRepository = {
  async getAll(): Promise<IUser[]> {
    const { data } = await apiClient.get<IUser[]>('/admin/agents')
    return data
  },
  async create(payload: CreateAgentDto): Promise<IUser> {
    const { data } = await apiClient.post<IUser>('/admin/agents', payload)
    return data
  },
}