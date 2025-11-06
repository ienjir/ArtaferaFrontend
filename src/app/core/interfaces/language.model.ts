import {z} from "zod";

export const LanguageSchema = z.object({
  id: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
  language_name: z.string(),
  language_code: z.string(),
})

export type Language = z.infer<typeof LanguageSchema>

export interface LanguageModel {
  id: number
  created_at: string
  updated_at: string
  language_name: string
  language_code: string
}
