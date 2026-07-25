import { apiClient } from '@/infrastructure/http/apiClient'
import type { IUser } from '@/core/interfaces/IUser'
import type { CreatePartnerDto } from '@/application/dto/AdminPartnerDto'

export const AdminPartnerRepository = {
  async getAll(): Promise<IUser[]> {
    const { data } = await apiClient.get<IUser[]>('/admin/partners')
    return data
  },
  async approve(userId: number): Promise<IUser> {
    const { data } = await apiClient.post<{ user: IUser }>(`/admin/partners/${userId}/approve`)
    return data.user
  },

  async create(payload: CreatePartnerDto): Promise<IUser> {
  const { data } = await apiClient.post<IUser>('/admin/partners', payload)
  return data
},
}