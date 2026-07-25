import { AdminAgentRepository } from '@/infrastructure/repositories/AdminAgentRepository'
import type { CreateAgentDto } from '@/application/dto/AdminAgentDto'

export const AdminAgentService = {
  async listAll() {
    return AdminAgentRepository.getAll()
  },
  async create(payload: CreateAgentDto) {
    return AdminAgentRepository.create(payload)
  },
}