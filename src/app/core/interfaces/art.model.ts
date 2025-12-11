import {z} from "zod";
import {ArtPictureModel, ArtPictureSchema} from "@interfaces/art-picture.model";
import {ArtTranslationModel, ArtTranslationSchema} from "@interfaces/art-translation.model";
import {CurrencyModel, CurrencySchema} from "@interfaces/currency.model";

export const ArtSchema = z.object({
  id: z.number(),
  price: z.number(),
  currency_id: z.number(),
  currency: CurrencySchema,
  creation_year: z.number(),
  width: z.number().optional(),
  height: z.number().optional(),
  depth: z.number().optional(),
  artPictures: z.array(ArtPictureSchema).optional(),
  translations: z.array(ArtTranslationSchema).optional(),
  available: z.boolean(),
})

export type Art = z.infer<typeof ArtSchema>

export interface ArtModel {
  id: number
  price: number
  currency_id: number
  currency: CurrencyModel
  creation_year: number
  width?: number
  height?: number
  depth?: number
  artPictures?: ArtPictureModel[]
  translations?: ArtTranslationModel[]
  available: boolean
}

export interface ArtListResult {
  arts: ArtModel[];
  count: number;
}

export interface PublicListResult {
  arts: ArtModel[];
  limit: number;
  offset: number;
  count: number;
}
