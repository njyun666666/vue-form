import { z } from 'zod'

export const baseInfoSchema = z.object({
  formId: z.string().optional(),
  applicationId: z.string(),
  applicationName: z.string(),
  applicationDate: z.date()
})
