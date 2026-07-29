import { apiClient } from '@/infrastructure/http/apiClient'
import type { CreateProductDto, UpdateProductDto } from '@/application/dto/PartnerProductDto'
import type { IProduct } from '@/core/interfaces/IProduct'

export const PartnerProductRepository = {
  async getMine(): Promise<IProduct[]> {
    const { data } = await apiClient.get<IProduct[]>('/my-products')
    return data
  },
  async create(payload: CreateProductDto): Promise<IProduct> {
    const { data } = await apiClient.post<IProduct>('/products', payload)
    return data
  },

  async update(id: number, payload: UpdateProductDto) {
  const { data } = await apiClient.put(`/products/${id}`, payload)
  return data
},

async delete(id: number) {
  await apiClient.delete(`/products/${id}`)
},
}