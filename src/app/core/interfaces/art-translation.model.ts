import {LanguageModel, LanguageSchema} from "@interfaces/language.model";
import {z} from "zod";

export const ArtTranslationSchema = z.object({
  id: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
  art_id: z.number(),
  language_id: z.number(),
  language: LanguageSchema.optional(),
  title: z.string(),
  description: z.string(),
  text: z.string(),
  label: z.string(),
})

export type ArtTranslation = z.infer<typeof ArtTranslationSchema>

export interface ArtTranslationModel {
  id: number
  created_at: string
  updated_at: string
  art_id: number
  language_id: number
  language?: LanguageModel
  title: string
  description: string
  text: string
  label: string
}
