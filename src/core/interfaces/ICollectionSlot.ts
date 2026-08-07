export interface ICollectionSlot {
  id: number
  label: string
  day_of_week: number // 1 = Lundi ... 7 = Dimanche
  start_time: string
  end_time: string
  zone: string | null
  capacity: number
  is_available: boolean
}