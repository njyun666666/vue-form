import { z } from 'zod'

export const orgUserDeptSchema = z
  .object({
    userDeptId: z.string(),
    deptId: z.string(),
    jobTitleId: z.string(),
    isPrimary: z.boolean(),
    isDeptManager: z.boolean(),
    isDeleted: z.boolean()
  })
  .partial()
