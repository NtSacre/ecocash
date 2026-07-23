export interface IPartnerProfile {
  id: number
  company_name: string
  description: string | null
  address: string | null
}

// "partner.partnerProfile" côté Laravel devient "partner.partner_profile" en JSON
// (Eloquent snake_case automatiquement les noms de relations à la sérialisation)
export interface IPartnerSummary {
  id: number
  name: string
  partner_profile: IPartnerProfile | null
}