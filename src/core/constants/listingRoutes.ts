// ⚠️ Non testées côté backend — à confirmer avec :
// php artisan route:list --path=listing
// php artisan route:list --path=response
export const LISTING_ROUTES = {
  ACTIVE: '/listings',
  DETAIL: (id: number | string) => `/listings/${id}`,
} as const

export const RESPONSE_ROUTES = {
  MINE: '/my-responses',
  CREATE: (listingId: number | string) => `/listings/${listingId}/responses`,
} as const