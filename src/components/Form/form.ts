import { z } from 'zod'

export const baseInfoSchema = z.object({
  formId: z.string().optional(),
  formClass: z.string(),
  applicantId: z.string(),
  applicantName: z.string(),
  applicationDate: z.date(),
  description: z.string().optional()
})
