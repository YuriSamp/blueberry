import * as z from 'zod'

export const pageSchema = z.object({
  title: z.string(),
  date: z.date(),
  emotionID: z.string(),
  text: z.string(),
})

export const journalSchema = z.object({
  title: z.string().min(1, 'Empty title field'),
  date: z.string().min(1, 'Empty date field'),
  emotionID: z.string().min(1, 'Empty emotion field'),
  text: z.string().min(1, 'Empty text field'),
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

export interface Idiary extends journalType {
  id: number
}

export type SetAtom<Args extends unknown[], Result> = <A extends Args>(
  ...args: A
) => Result
