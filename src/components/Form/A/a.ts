import { z } from 'zod'

export const aFormInfoSchema = z
  .object({
    title: z.string(),
    content: z.string(),
    amount: z.number(),
    datetime: z.date().nullish(),
    radio: z.number(),
    checkbox: z.array(z.string()),
    select: z.string()
  })
  .partial()
