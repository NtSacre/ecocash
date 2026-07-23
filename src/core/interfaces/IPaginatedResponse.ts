// Format de pagination BRUT de Laravel (Model::paginate()) — confirmé
// contre la vraie réponse de /listings.
export interface IPaginationLink {
  url: string | null
  label: string
  active: boolean
}

export interface IPaginatedResponse<T> {
  current_page: number
  data: T[]
  first_page_url: string | null
  from: number | null
  last_page: number
  last_page_url: string | null
  links: IPaginationLink[]
  next_page_url: string | null
  path: string
  per_page: number
  prev_page_url: string | null
  to: number | null
  total: number
}