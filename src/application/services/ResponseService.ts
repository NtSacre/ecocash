import { ResponseRepository } from '@/infrastructure/repositories/ResponseRepository'

export const ResponseService = {
  async listMine() {
    return ResponseRepository.getMine()
  },
  async respond(listingId: number | string, quantityOffered: number) {
    return ResponseRepository.create(listingId, quantityOffered)
  },
 async selectSlot(responseId: number, collectionSlotId: number, collectionDate: string) {
  return ResponseRepository.selectSlot(responseId, collectionSlotId, collectionDate)
},
}