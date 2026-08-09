export type CollectionStatus = 'assigned' | 'in_progress' | 'collected' | 'delivered' | 'validated'

export interface ICollectionSlotSummary {
  id: number
  label: string
  day_of_week: number
  start_time: string
  end_time: string
}

export interface ICollectionResponseSummary {
  id: number
  quantity_offered: string
  collection_date: string | null
  listing: {
    id: number
    title: string
    material: { name: string; unit: string }
  }
  particulier: { id: number; name: string; phone: string }
  slot: ICollectionSlotSummary | null
}

export interface ICollection {
  id: number
  status: CollectionStatus
  quantity_collected: string | null
  collected_at: string | null
  delivered_at: string | null
  validated_at: string | null
  agent: { id: number; name: string; phone: string }
  response: ICollectionResponseSummary
}