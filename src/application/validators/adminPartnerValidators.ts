import { z } from 'zod'

export const createPartnerSchema = z.object({
  name: z.string().min(2, 'Le nom est requis'),
  email: z.string().email('Email invalide').optional().or(z.literal('')),
  phone: z.string().min(7, 'Numéro invalide'),
  preferred_otp_channel: z.enum(['email', 'sms', 'whatsapp']).optional(),
  company_name: z.string().min(2, 'Le nom de la société est requis'),
  description: z.string().optional(),
  address: z.string().optional(),
})

export type CreatePartnerFormValues = z.infer<typeof createPartnerSchema>