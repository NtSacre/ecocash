import type { OtpChannel } from '@/core/interfaces/IAuth'

export interface RegisterDto {
  name: string
  email?: string
  phone: string // format complet avec indicatif, ex: "+221771234567"
  role_id: number
  preferred_otp_channel?: OtpChannel
}

export interface LoginMobileDto {
  phone: string
  preferredChannel?: OtpChannel // ⚠️ camelCase côté backend, contrairement au reste
}

export interface VerifyOtpDto {
  user_id: number
  otp_code: string
}

export interface ResendOtpDto {
  user_id: number
  otp_channel?: OtpChannel
}