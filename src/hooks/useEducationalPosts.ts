import { useQuery } from '@tanstack/react-query'
import { EducationalPostService } from '@/application/services/EducationalPostService'

export function useEducationalPosts(page = 1) {
  return useQuery({
    queryKey: ['educational-posts', page],
    queryFn: () => EducationalPostService.listPosts(page),
  })
}