import { z } from 'zod'

export const educationalPostFormSchema = z.object({
  title: z.string().min(3, 'Titre trop court'),
  content: z.string().min(10, 'Contenu trop court'),
})

export type EducationalPostFormValues = z.infer<typeof educationalPostFormSchema>