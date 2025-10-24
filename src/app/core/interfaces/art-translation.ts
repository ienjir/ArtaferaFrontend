import {Language} from "@core/interfaces/language";

export interface ArtTranslation {
  id: number
  created_at: string
  updated_at: string
  art_id: number
  language_id: number
  language?: Language
  title: string
  description: string
  text: string
  label: string
}
