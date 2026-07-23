export function toNumber(value: string | number | null | undefined): number {
  if (value === null || value === undefined) return 0
  const n = typeof value === 'string' ? parseFloat(value) : value
  return Number.isNaN(n) ? 0 : n
}

export function remainingQuantity(listing: { target_quantity: string; reserved_quantity: string }): number {
  return Math.max(0, toNumber(listing.target_quantity) - toNumber(listing.reserved_quantity))
}