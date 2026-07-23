export type ListingResponseStatus =
  | 'pending'
  | 'slot_selected'
  | 'collected'
  | 'delivered'
  | 'validated'
  | 'paid'
  | 'cancelled'

export interface IListingResponse {
  id: number
  listing_id: number
  quantity_offered: string
  quantity_collected: string | null
  status: ListingResponseStatus
  created_at: string
}