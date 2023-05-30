import * as z from 'zod'

export const pageSchema = z.object({
  title: z.string(),
  date: z.date(),
  emotion: z.string(),
  text: z.string(),
  color: z.string(),
  authorId: z.string(),
})

export const updatePageSchema = z.object({
  title: z.string(),
  date: z.date(),
  emotion: z.string(),
  text: z.string(),
  color: z.string(),
})
