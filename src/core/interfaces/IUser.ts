export interface IRole {
  id: number
  name: string
}

// roles/permissions arrivent en tableaux de strings (getRoleNames(),
// getAllPermissions()->pluck('name')) — pas d'objets imbriqués.
export interface IUser {
  id: number
  name: string
  email: string | null
  phone: string
  status: 'active' | 'pending' | 'suspended'
  mobile_money_number: string | null
  roles: string[]
  avatar?: string | null
  permissions: string[]
  partner_profile?: { company_name: string; description: string | null; address: string | null } | null
  coverage_zone?: string | null
}