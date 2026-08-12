import { z } from 'zod'

export const profileFormSchema = z.object({
  name: z.string().min(2, 'Le nom est requis'),
  email: z.string().email('Email invalide').optional().or(z.literal('')),
  mobile_money_number: z.string().optional(),
  coverage_zone: z.string().optional(),
  preferred_otp_channel: z.enum(['email', 'sms', 'whatsapp']).optional(),
})

export type ProfileFormValues = z.infer<typeof profileFormSchema>