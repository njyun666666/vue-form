import { z } from 'zod'

export const productDetailSchema = z
  .object({
    guid: z.string(),
    id: z.string(),
    name: z.string(),
    price: z.number().nullish(),
    description: z.string(),
    image: z.string(),
    category: z.string(),
    isDeleted: z.boolean().default(false)
  })
  .partial()
