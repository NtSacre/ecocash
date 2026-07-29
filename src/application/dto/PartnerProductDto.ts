export interface CreateProductDto {
  name: string
  description?: string
  price?: number
  image_path?: string
}

export interface UpdateProductDto {
  name: string
  description?: string
  price?: number
  image_path?: string
  is_available?: boolean
}