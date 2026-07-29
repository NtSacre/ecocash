export interface ICollectionSlot {
  id: number
  label: string
  date: string
  start_time: string
  end_time: string
  zone: string | null
  capacity: number
  is_available: boolean
}