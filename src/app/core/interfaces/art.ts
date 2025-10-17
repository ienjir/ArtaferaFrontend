import {Model} from "@core/interfaces/base";
import {Currency} from "@core/interfaces/currency";

export interface Art {
  Model: Model
  Price: number
  CurrencyID: number
  Currency: Currency
  CreationYear: number
  Width?: number
  Height?: number
  Depth?: number
  // Pictures: Pictures
  // Translation: Translation
  // Order: Order
  Available: boolean
}
