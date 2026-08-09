import { z } from 'zod'

export const createAgentSchema = z.object({
  name: z.string().min(2, 'Le nom est requis'),
  email: z.string().email('Email invalide').optional().or(z.literal('')),
  phone: z.string().min(7, 'Numéro invalide'),
  preferred_otp_channel: z.enum(['email', 'sms', 'whatsapp']).optional(),
  coverage_zone: z.string().optional(),
})

export type CreateAgentFormValues = z.infer<typeof createAgentSchema>