import { z } from 'zod'

export const partnerListingFormSchema = z
  .object({
    material_id: z.number({ message: 'Sélectionnez une matière' }),
    title: z.string().min(3, 'Titre trop court'),
    description: z.string().optional(),
    target_quantity: z.number().min(0.01, 'Quantité cible requise'),
    unit_price: z.number().min(0, 'Prix requis'),
    min_quantity_per_response: z.number().min(0, 'Quantité minimale requise'),
    start_date: z.string().optional(),
    end_date: z.string().optional(),
  })
  .refine((data) => !data.start_date || !data.end_date || data.end_date >= data.start_date, {
    message: 'La date de fin doit être après la date de début',
    path: ['end_date'],
  })

export type PartnerListingFormValues = z.infer<typeof partnerListingFormSchema>