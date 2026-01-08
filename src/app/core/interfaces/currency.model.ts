import {z} from "zod";

export const CurrencySchema = z.object({
  id: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
  currency_code: z.string(),
  currency_name: z.string(),
})

export type Currency = z.infer<typeof CurrencySchema>

export interface CurrencyModel {
  id: number
  created_at: string
  updated_at: string
  currency_code: string
  currency_name: string
}
