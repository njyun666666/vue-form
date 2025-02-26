import { z } from 'zod'

export const baseInfoSchema = z.object({
  formId: z.string().optional(),
  formClass: z.string(),
  applicationId: z.string(),
  applicationName: z.string(),
  applicationDate: z.date(),
  description: z.string().optional()
})
