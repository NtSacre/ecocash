import { z } from 'zod'

export const partnerProductFormSchema = z.object({
  name: z.string().min(2, 'Nom requis'),
  description: z.string().optional(),
  price: z.number().min(0, 'Prix invalide').optional(),
})

export type PartnerProductFormValues = z.infer<typeof partnerProductFormSchema>