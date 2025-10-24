import {Currency} from "@core/interfaces/currency";
import { ArtPicture } from "./art-picture";
import {ArtTranslation} from "@interfaces/art-translation";

export interface ArtModel {
  id: number
  price: number
  currency_id: number
  currency: Currency
  creation_year: number
  width?: number
  height?: number
  depth?: number
  pictures?: ArtPicture[]
  translations?: ArtTranslation[]
  available: boolean
}

export interface ArtListResult {
  arts: ArtModel[];
  count: number;
}
