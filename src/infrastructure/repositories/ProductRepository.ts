import { apiClient } from '@/infrastructure/http/apiClient'
import type { IProduct } from '@/core/interfaces/IProduct'
import type { IPaginatedResponse } from '@/core/interfaces/IPaginatedResponse'

export const ProductRepository = {
  async getAll(page = 1): Promise<IPaginatedResponse<IProduct>> {
    const { data } = await apiClient.get<IPaginatedResponse<IProduct>>('/products', {
      params: { page },
    })
    return data
  },
}