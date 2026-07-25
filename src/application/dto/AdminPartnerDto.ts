export interface CreatePartnerDto {
  name: string
  email?: string
  phone: string
  preferred_otp_channel?: 'email' | 'sms' | 'whatsapp'
  company_name: string
  description?: string
  address?: string
}