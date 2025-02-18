import { i18n } from '@/i18n/config'
import { z } from 'zod'

const { t } = i18n.global

// .min(1, t('Message.Required'))
// .min(1, t('Message.Select_at_least_number_items_is_required', { number: 1 })),

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
