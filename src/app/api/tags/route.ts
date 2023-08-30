import { auth } from '@clerk/nextjs'
import * as z from 'zod'

import { db } from '@lib/db'
import { emotionSchema } from '@lib/validations/diary'


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
      return new Response(JSON.stringify([]))
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
