import type { IPartnerSummary } from '@/core/interfaces/IPartner'

export interface IMaterial {
  id: number
  name: string
  unit: string
}

export type ListingStatus = 'pending' | 'validated' | 'active' | 'closed' | 'rejected'

export interface IListing {
  id: number
  title: string
  description: string | null
  // decimal(12,2) non casté côté Laravel → toujours des strings en JSON
  target_quantity: string
  reserved_quantity: string
  collected_quantity: string
  unit_price: string
  min_quantity_per_response: string
  status: ListingStatus
  material: IMaterial
  partner: IPartnerSummary
}