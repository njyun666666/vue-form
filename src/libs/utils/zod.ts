import { FormFieldModeEnum } from '../enums/FormTypes'
import { i18n } from '@/i18n/config'
import { z } from 'zod'

const { t } = i18n.global

export const zodErrorMap: z.ZodErrorMap = (issue, ctx) => {
  if (issue.code === 'invalid_type' && ['undefined', 'null'].includes(issue.received)) {
    return { message: t('Message.Required') }
  }

  return { message: ctx.defaultError }
}

export const requiredFieldsValidator = (
  val: Record<string, unknown>,
  fieldMode: Record<string, FormFieldModeEnum> = {}
) => {
  const failedFields: string[] = []

  Object.entries(val).forEach(([key, value]) => {
    if (fieldMode[key] === FormFieldModeEnum.required) {
      if (
        (typeof value === 'string' && value.trim() === '') ||
        (typeof value === 'number' && isNaN(value)) ||
        value === null ||
        value === undefined ||
        (Array.isArray(value) && value.length === 0) ||
        (value instanceof Date && isNaN(value.getTime()))
      ) {
        failedFields.push(key)
      }
    }
  })

  return failedFields
}
