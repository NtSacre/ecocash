import { z } from 'zod'

export const adminListingFormSchema = z
  .object({
    partner_id: z.number({ message: 'Sélectionnez un partenaire' }),
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

export type AdminListingFormValues = z.infer<typeof adminListingFormSchema>

export const renewFormSchema = z
  .object({
    start_date: z.string().optional(),
    end_date: z.string().optional(),
  })
  .refine((data) => !data.start_date || !data.end_date || data.end_date >= data.start_date, {
    message: 'La date de fin doit être après la date de début',
    path: ['end_date'],
  })

export type RenewFormValues = z.infer<typeof renewFormSchema>