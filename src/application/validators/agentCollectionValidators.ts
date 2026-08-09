import { z } from 'zod'

export function createConfirmQuantitySchema(max: number) {
  return z.object({
    quantity_collected: z
      .number()
      .min(0.01, 'Quantité requise')
      .max(max * 1.2, 'Quantité anormalement élevée par rapport à ce qui était proposé'),
  })
}

export type ConfirmQuantityFormValues = { quantity_collected: number }