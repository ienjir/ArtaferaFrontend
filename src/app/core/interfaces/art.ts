import {Model} from "@core/interfaces/base";
import {Currency} from "@core/interfaces/currency";

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
