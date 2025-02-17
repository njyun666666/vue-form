import { i18n } from '@/i18n/config'
import { z } from 'zod'

const { t } = i18n.global

export const zodErrorMap: z.ZodErrorMap = (issue, ctx) => {
  if (issue.code === 'invalid_type' && ['undefined', 'null'].includes(issue.received)) {
    return { message: t('Message.Required') }
  }

  return { message: ctx.defaultError }
}
