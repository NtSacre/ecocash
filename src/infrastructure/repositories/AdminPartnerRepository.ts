import { apiClient } from '@/infrastructure/http/apiClient'
import type { CreatePartnerDto } from '@/application/dto/AdminPartnerDto'
import type { IUser } from '@/core/interfaces/IUser'

export const AdminPartnerRepository = {
  async getAll(): Promise<IUser[]> {
    const { data } = await apiClient.get<IUser[]>('/admin/partners')
    return data
  },
  async create(payload: CreatePartnerDto): Promise<IUser> {
    const { data } = await apiClient.post<IUser>('/admin/partners', payload)
    return data
  },
  async update(id: number, payload: Partial<CreatePartnerDto> & { status?: string }): Promise<IUser> {
    const { data } = await apiClient.put<IUser>(`/admin/partners/${id}`, payload)
    return data
  },
  async remove(id: number): Promise<void> {
    await apiClient.delete(`/admin/partners/${id}`)
  },
  async approve(userId: number): Promise<IUser> {
    const { data } = await apiClient.post<{ user: IUser }>(`/admin/partners/${userId}/approve`)
    return data.user
  },
}