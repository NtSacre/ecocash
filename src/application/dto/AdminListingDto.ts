export interface AdminCreateListingDto {
  partner_id: number
  material_id: number
  title: string
  description?: string
  target_quantity: number
  unit_price: number
  image_path?: string
  min_quantity_per_response: number
  start_date?: string
  end_date?: string
}

export type AdminUpdateListingDto = Partial<AdminCreateListingDto>

export interface RenewListingDto {
  start_date?: string
  end_date?: string
}

export interface AdminListingFilters {
  status?: 'active' | 'suspended' | 'closed'
  partner_id?: number
  page?: number
}