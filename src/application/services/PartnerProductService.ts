import { PartnerProductRepository } from '@/infrastructure/repositories/PartnerProductRepository'
import type { CreateProductDto, UpdateProductDto } from '@/application/dto/PartnerProductDto'

export const PartnerProductService = {
  async listMine() {
    return PartnerProductRepository.getMine()
  },
  async create(payload: CreateProductDto) {
    return PartnerProductRepository.create(payload)
  },

  async update(id: number, payload: UpdateProductDto) {
  return PartnerProductRepository.update(id, payload)
},

async delete(id: number) {
  return PartnerProductRepository.delete(id)
},
}