import { z } from 'zod'

export const aFormInfoSchema = z
  .object({
    title: z.string().toUpperCase(),
    content: z.string(),
    amount: z.number(),
    datetime: z.date(),
    radio: z.number(),
    checkbox: z.array(z.string()),
    select: z.string()
  })
  .partial()
