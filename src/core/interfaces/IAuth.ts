import type { IUser } from '@/core/interfaces/IUser'

export interface IAuthTokenPayload {
  access_token: string
  token_type: string
  expires_in: number
}

export interface IAuthResponse extends IAuthTokenPayload {
  user: IUser
  message?: string
}

export interface IRequestOtpResponse {
  message: string
  expires_in: number
}

export type OtpChannel = 'email' | 'sms' | 'whatsapp'

// Réponse quand une étape OTP est requise (register ET loginMobile)
export interface IRequiresOtpResponse {
  success: boolean
  message: string
  requires_otp: true
  user_id: number
  otp_sent_via: OtpChannel
  contact?: string // masqué (email/tel), présent uniquement sur loginMobile
}

// Réponse finale après verifyOtp
export interface IAuthSuccessResponse {
  success: boolean
  message: string
  access_token: string
  token_type: string
  expires_in: number
  user: Omit<import('./IUser').IUser, 'roles' | 'permissions'>
  roles: string[]
  permissions: string[]
}