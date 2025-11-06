import {z} from "zod";

export const CurrencySchema = z.object({
  id: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  currencyCode: z.string(),
  currencyName: z.string(),
})

export type Currency = z.infer<typeof CurrencySchema>

export interface CurrencyModel {
  id: number
  createdAt: string
  updatedAt: string
  currencyCode: string
  currencyName: string
}
