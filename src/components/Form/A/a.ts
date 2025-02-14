import { z } from 'zod'

export const aFormInfoSchema = z.object({
  title: z.string().min(1, '標題必填'),
  content: z.string().min(1, '內容必填'),
  amount: z.number().min(1, '金額必須大於 0'),
  datetime: z.date(),
  checkbox: z.array(z.string()).min(1, '至少選一個'),
  select: z.array(z.string()).min(1, '至少選一個')
})
