import type { IPartnerSummary } from '@/core/interfaces/IPartner'

export interface IEducationalPost {
  id: number
  title: string
  content: string
  image_path: string | null
  video_path: string | null
  partner: IPartnerSummary
  created_at: string
}