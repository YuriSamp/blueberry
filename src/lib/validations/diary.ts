import * as z from 'zod'

export const pageSchema = z.object({
  title: z.string(),
  date: z.date(),
  emotion: z.string(),
  text: z.string(),
  color: z.string(),
})

export const journalSchema = z.object({
  title: z.string().min(1, 'Empty title field'),
  date: z.string().min(1, 'Empty date field'),
  emotion: z.string().min(1, 'Empty emotion field'),
  text: z.string().min(1, 'Empty text field'),
  color: z.string().min(1),
})

export const emotionSchema = z.object({
  emotion: z.string().min(1, 'Empty emotion field'),
  color: z.string().min(1, 'No associated color'),
})

type Tags = z.infer<typeof emotionSchema>

export interface ITags extends Tags {
  id: string
}

export type journalType = z.infer<typeof journalSchema>
