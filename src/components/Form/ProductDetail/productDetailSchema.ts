import { z } from 'zod'

export const productDetailSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    price: z.number().nullish(),
    description: z.string(),
    image: z.string(),
    category: z.string(),
    isDeleted: z.boolean()
  })
  .partial()

// guid: z.string(),
