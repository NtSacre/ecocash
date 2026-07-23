import { ProductRepository } from '@/infrastructure/repositories/ProductRepository'

export const ProductService = {
  async listAvailableProducts(page = 1) {
    return ProductRepository.getAll(page)
  },
}