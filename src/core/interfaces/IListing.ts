import type { IPartnerSummary } from '@/core/interfaces/IPartner'

export interface IMaterial {
  id: number
  name: string
  unit: string
}

export type ListingStatus = 'active' | 'suspended' | 'closed'

export interface IListing {
  id: number
  title: string
  description: string | null
  target_quantity: string
  reserved_quantity: string
  collected_quantity: string
  unit_price: string
  min_quantity_per_response: string
  start_date: string | null
  end_date: string | null
  status: ListingStatus
  material: IMaterial
  partner: IPartnerSummary
}