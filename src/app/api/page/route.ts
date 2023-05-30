import { db } from '@lib/db'
import { pageSchema } from '@lib/validations/diary'
import * as z from 'zod'

export async function GET(req: Request) {
  try {
    const id = req.url?.split('=')[1]
    const posts = await db.page.findMany({
      select: {
        title: true,
        date: true,
        emotion: true,
        text: true,
        color: true,
        id: true,
        authorId: true,
      },
      where: {
        authorId: id,
      },
    })
    return new Response(JSON.stringify(posts))
  } catch (error) {
    return new Response(null, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const json = await req.json()
    const body = pageSchema.parse({ ...json, date: new Date(json.date) })

    const post = await db.page.create({
      data: {
        title: body.title,
        date: body.date,
        emotion: body.emotion,
        text: body.text,
        color: body.color,
        authorId: body.authorId,
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
