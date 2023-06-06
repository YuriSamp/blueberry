import { auth } from '@clerk/nextjs'
import * as z from 'zod'

import { db } from '@lib/db'
import { emotionSchema } from '@lib/validations/diary'

const initialOptions = [
  { emotion: 'Happy', color: '#47B7DC' },
  { emotion: 'Sad', color: '#FF9900' },
  { emotion: 'Angry', color: '#F6D155' },
  { emotion: 'Afraid', color: '#AD70A4' },
]

export async function GET() {
  try {
    const { userId } = auth()

    if (userId === null) {
      return new Response('Unauthorized', { status: 403 })
    }

    const posts = await db.emotion.findMany({
      select: {
        emotion: true,
        color: true,
        id: true,
      },
      where: {
        authorId: userId,
      },
    })

    if (posts.length === 0) {
      const initialOptionsWithId = initialOptions.map((option) => ({
        ...option,
        authorId: userId,
      }))

      const post = await db.emotion.createMany({
        data: initialOptionsWithId,
      })
      return new Response(JSON.stringify(post))
    }

    return new Response(JSON.stringify(posts))
  } catch (error) {
    return new Response(null, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = auth()

    if (userId === null) {
      return new Response('Unauthorized', { status: 403 })
    }

    const json = await req.json()
    const body = emotionSchema.parse(json)

    const post = await db.emotion.create({
      data: {
        emotion: body.emotion,
        color: body.color,
        authorId: userId,
      },
    })
    return new Response(JSON.stringify(post))
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }
    return new Response(null, { status: 500 })
  }
}
