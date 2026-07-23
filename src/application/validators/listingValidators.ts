import { z } from 'zod'

// Le min et le max dépendent de l'annonce consultée — pas de schéma statique
// possible, on le génère à la volée avec les bornes réelles.
export function createRespondSchema(min: number, max: number) {
  return z.object({
    quantity_offered: z
      .number()
      .min(min, `Quantité minimale : ${min}`)
      .max(max, `Quantité maximale disponible : ${max}`),
  })
}

export type RespondFormValues = { quantity_offered: number }