import { EducationalPostRepository } from '@/infrastructure/repositories/EducationalPostRepository'

export const EducationalPostService = {
  async listPosts(page = 1) {
    return EducationalPostRepository.getAll(page)
  },
}