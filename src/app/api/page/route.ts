import { currentUser } from '@clerk/nextjs'
import { db } from '@lib/db'
import { pageSchema } from '@lib/validations/diary'
import * as z from 'zod'

export async function GET() {
  try {
    const user = await currentUser()
    if (!user) throw Error

    const posts = await db.pages.findMany({
      select: {
        title: true,
        date: true,
        emotino: true,
        text: true,
        color: true,
        id: true,
        authorId: true,
      },
      where: {
        authorId: user.id,
      },
    })

    return new Response(JSON.stringify(posts))
  } catch (error) {
    return new Response(null, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const user = await currentUser()
    if (!user) throw Error

    const json = await req.json()
    const body = pageSchema.parse(json)

    const post = await db.pages.create({
      data: {
        title: body.title,
        date: body.date,
        emotino: body.emotion,
        text: body.text,
        color: body.color,
        id: body.id,
        authorId: user.id,
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
