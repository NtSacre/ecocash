import type { IUser } from '@/core/interfaces/IUser'

export type OtpChannel = 'email' | 'sms' | 'whatsapp'

export interface IRequiresOtpResponse {
  success: boolean
  message: string
  requires_otp: true
  user_id: number
  otp_sent_via: OtpChannel
  contact?: string
}

// Le backend renvoie "roles"/"permissions" en tableaux de strings À PART du
// user, et le champ "user.roles" imbriqué contient en réalité des OBJETS
// Spatie complets (id, name, pivot...) — jamais utilisés directement,
// uniquement les tableaux de strings au niveau racine de la réponse.
type RawUser = Omit<IUser, 'roles' | 'permissions'>

export interface IAuthSuccessResponse {
  success: boolean
  message: string
  access_token: string
  token_type: string
  expires_in: number
  user: RawUser
  roles: string[]
  permissions: string[]
}

// Même enveloppe que verify-otp, sans les champs de token.
export interface IMeResponse {
  user: RawUser
  roles: string[]
  permissions: string[]
}