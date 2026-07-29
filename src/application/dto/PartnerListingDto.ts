export interface CreateListingDto {
  material_id: number
  title: string
  description?: string
  target_quantity: number
  unit_price: number
  min_quantity_per_response: number
  start_date?: string
  end_date?: string
}

export interface RenewListingDto {
  start_date?: string
  end_date?: string
}
export interface UpdateListingDto {
  material_id: number
  title: string
  description?: string
  target_quantity: number
  unit_price: number
  min_quantity_per_response: number
  start_date?: string
  end_date?: string
}