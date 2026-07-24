export const ADMIN_LISTING_ROUTES = {
  ALL: '/admin/listings',
  CREATE: '/admin/listings',
  UPDATE: (id: number | string) => `/admin/listings/${id}`,
  DELETE: (id: number | string) => `/admin/listings/${id}`,
  SUSPEND: (id: number | string) => `/admin/listings/${id}/suspend`,
  RENEW: (id: number | string) => `/admin/listings/${id}/renew`,
} as const