import {z} from "zod";

export const PictureSchema = z.object({
  id: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
  name: z.string(),
  is_public: z.boolean(),
  type: z.string(),
})

export type Picture = z.infer<typeof PictureSchema>

export interface PictureModel {
  id: number
  created_at: string
  updated_at: string
  name: string
  is_public: boolean
  type: string
}
