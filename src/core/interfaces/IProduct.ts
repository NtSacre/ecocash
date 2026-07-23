import type { IPartnerSummary } from '@/core/interfaces/IPartner'

export interface IProduct {
  id: number
  name: string
  description: string | null
  // Attention : les colonnes decimal(12,2) ne sont pas castées côté modèle
  // Laravel → l'API renvoie une string ("1500.00"), pas un number. Le
  // formatage (formatCurrency) doit donc accepter les deux.
  price: string | null
  image_path: string | null
  is_available: boolean
  partner: IPartnerSummary
}