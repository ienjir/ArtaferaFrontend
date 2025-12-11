import {PictureModel, PictureSchema} from "@interfaces/picture.model";
import {z} from "zod";

export const ArtPictureSchema = z.object({
  id: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
  artId: z.number(),
  pictureId: z.number(),
  picture: PictureSchema.optional(),
  name: z.string(),
  priority: z.number().optional(),
})

export type ArtPicture = z.infer<typeof ArtPictureSchema>

export interface ArtPictureModel {
  id: number
  createdAt: string
  updatedAt: string
  artId: number
  pictureId: number
  picture?: PictureModel
  name: string
  priority?: number
}
