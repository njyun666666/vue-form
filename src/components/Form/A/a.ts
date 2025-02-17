import { i18n } from '@/i18n/config'
import { z } from 'zod'

const { t } = i18n.global

export const aFormInfoSchema = z.object({
  title: z.string().min(1, t('Message.Required')),
  content: z.string().min(1, t('Message.Required')),
  amount: z.number(),
  datetime: z.date(),
  radio: z.string(),
  checkbox: z
    .array(z.string())
    .min(1, t('Message.Select_at_least_number_items_is_required', { number: 1 })),
  select: z.string()
})
