export interface CreateEducationalPostDto {
  title: string
  content: string
  image_path?: string
  video_path?: string
}

export type UpdateEducationalPostDto = Partial<CreateEducationalPostDto>