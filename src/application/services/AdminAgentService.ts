import { AdminAgentRepository } from '@/infrastructure/repositories/AdminAgentRepository'
import type { CreateAgentDto } from '@/application/dto/AdminAgentDto'

export const AdminAgentService = {
  async listAll() {
    return AdminAgentRepository.getAll()
  },
  async create(payload: CreateAgentDto) {
    return AdminAgentRepository.create(payload)
  },
  async update(id: number, payload: Partial<CreateAgentDto> & { status?: string }) {
    return AdminAgentRepository.update(id, payload)
  },
  async remove(id: number) {
    return AdminAgentRepository.remove(id)
  },
}