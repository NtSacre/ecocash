export interface CreateAgentDto {
  name: string
  email?: string
  phone: string
  preferred_otp_channel?: 'email' | 'sms' | 'whatsapp'
  coverage_zone?: string
}