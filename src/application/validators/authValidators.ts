import { z } from 'zod'

const localPhoneSchema = z
  .string()
  .min(7, 'Numéro trop court')
  .max(10, 'Numéro trop long')
  .regex(/^[0-9]+$/, 'Chiffres uniquement')

export const registerSchema = z.object({
  name: z.string().min(2, 'Le nom est requis'),
  email: z.string().email('Email invalide').optional().or(z.literal('')),
  countryCode: z.string(),
  localPhone: localPhoneSchema,
  preferred_otp_channel: z.enum(['email', 'sms', 'whatsapp']),
})

export const loginPhoneSchema = z.object({
  countryCode: z.string(),
  localPhone: localPhoneSchema,
  preferredChannel: z.enum(['email', 'sms', 'whatsapp']),
})

export const otpCodeSchema = z.object({
  otp_code: z.string().length(6, 'Le code doit contenir 6 chiffres'),
})

export type RegisterFormValues = z.infer<typeof registerSchema>
export type LoginPhoneFormValues = z.infer<typeof loginPhoneSchema>
export type OtpCodeFormValues = z.infer<typeof otpCodeSchema>