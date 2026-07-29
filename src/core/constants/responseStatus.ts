import type { ListingResponseStatus } from '@/core/interfaces/IListingResponse'

export const RESPONSE_STATUS_LABEL: Record<ListingResponseStatus, string> = {
  pending: 'En attente de créneau',
  slot_selected: 'Créneau choisi',
  collected: 'Collecté',
  delivered: 'Livré au partenaire',
  validated: 'Validé',
  paid: 'Payé',
  cancelled: 'Annulé',
}

export const RESPONSE_STATUS_TONE: Record<ListingResponseStatus, 'primary' | 'neutral' | 'warning'> = {
  pending: 'warning',
  slot_selected: 'neutral',
  collected: 'neutral',
  delivered: 'neutral',
  validated: 'primary',
  paid: 'primary',
  cancelled: 'neutral',
}