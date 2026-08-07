export interface CreateCollectionSlotDto {
  label: string
  day_of_week: number
  start_time: string
  end_time: string
  zone?: string
  capacity?: number
}

export type UpdateCollectionSlotDto = Partial<CreateCollectionSlotDto> & { is_available?: boolean }