import * as z from 'zod'

export const pageSchema = z.object({
  title: z.string(),
  date: z.string(),
  emotion: z.string(),
  text: z.string(),
  id: z.string(),
  color: z.string(),
})
