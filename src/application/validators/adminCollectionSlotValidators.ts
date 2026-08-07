import { z } from 'zod'

export const collectionSlotFormSchema = z
  .object({
    label: z.string().min(2, 'Libellé requis (ex: Matin, Après-midi)'),
    day_of_week: z.number({ message: 'Sélectionnez un jour' }).min(1).max(7),
    start_time: z.string().min(1, 'Heure de début requise'),
    end_time: z.string().min(1, 'Heure de fin requise'),
    zone: z.string().optional(),
    capacity: z.number().min(1, 'Capacité minimale : 1').optional(),
  })
  .refine((data) => data.end_time > data.start_time, {
    message: "L'heure de fin doit être après l'heure de début",
    path: ['end_time'],
  })

export type CollectionSlotFormValues = z.infer<typeof collectionSlotFormSchema>