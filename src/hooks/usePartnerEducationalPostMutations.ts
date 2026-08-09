import { useMutation, useQueryClient } from '@tanstack/react-query'
import { PartnerEducationalPostService } from '@/application/services/PartnerEducationalPostService'
import type { CreateEducationalPostDto, UpdateEducationalPostDto } from '@/application/dto/PartnerEducationalPostDto'

export function usePartnerEducationalPostMutations() {
  const queryClient = useQueryClient()
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['partner', 'educational-posts'] })

  const create = useMutation({
    mutationFn: (payload: CreateEducationalPostDto) => PartnerEducationalPostService.create(payload),
    onSuccess: invalidate,
  })

  const update = useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: UpdateEducationalPostDto }) =>
      PartnerEducationalPostService.update(id, payload),
    onSuccess: invalidate,
  })

  const remove = useMutation({
    mutationFn: (id: number) => PartnerEducationalPostService.remove(id),
    onSuccess: invalidate,
  })

  return { create, update, remove }
}