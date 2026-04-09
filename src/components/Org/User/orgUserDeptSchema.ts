import { z } from 'zod'

export const orgUserDeptSchema = z
  .object({
    userDeptId: z.string(),
    deptId: z.string(),
    jobTitleId: z.string(),
    isPrimary: z.boolean()
  })
  .partial()
