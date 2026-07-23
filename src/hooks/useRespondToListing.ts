import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ResponseService } from '@/application/services/ResponseService'

export function useRespondToListing(listingId: number | string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (quantityOffered: number) => ResponseService.respond(listingId, quantityOffered),
    onSuccess: () => {
      // Un listing peut voir sa quantité restante changer, et "mes réponses"
      // doit refléter la nouvelle réponse — on invalide les deux caches.
      queryClient.invalidateQueries({ queryKey: ['responses', 'mine'] })
      queryClient.invalidateQueries({ queryKey: ['listings'] })
    },
  })
}