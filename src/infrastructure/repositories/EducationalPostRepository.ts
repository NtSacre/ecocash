import { apiClient } from '@/infrastructure/http/apiClient'
import type { IEducationalPost } from '@/core/interfaces/IEducationalPost'
import type { IPaginatedResponse } from '@/core/interfaces/IPaginatedResponse'

export const EducationalPostRepository = {
  async getAll(page = 1): Promise<IPaginatedResponse<IEducationalPost>> {
    const { data } = await apiClient.get<IPaginatedResponse<IEducationalPost>>('/educational-posts', {
      params: { page },
    })
    return data
  },
}