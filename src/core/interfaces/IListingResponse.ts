import type { IListing } from '@/core/interfaces/IListing'
import type { ICollectionSlot } from '@/core/interfaces/ICollectionSlot'

export type ListingResponseStatus =
  | 'pending'
  | 'slot_selected'
  | 'collected'
  | 'delivered'
  | 'validated'
  | 'paid'
  | 'cancelled'

export interface ICollectionSummary {
  id: number
  status: string
  quantity_collected: string | null
  collected_at: string | null
  delivered_at: string | null
}

export interface IPaymentSummary {
  id: number
  net_amount: string
  status: string
  paid_at: string | null
}

export interface IListingResponse {
  id: number
  listing_id: number
  quantity_offered: string
  quantity_collected: string | null
  status: ListingResponseStatus
  listing: IListing
  slot: ICollectionSlot | null
  collection_date: string | null
  collection: ICollectionSummary | null
  payment: IPaymentSummary | null
  created_at: string
}