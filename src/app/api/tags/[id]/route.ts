import { auth } from '@clerk/nextjs'
import { db } from '@lib/db'
import { emotionSchema } from '@lib/validations/diary'
import * as z from 'zod'

const routeContextSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
})

export async function DELETE(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context)

    const { userId } = auth()

    if (userId === null) {
      return new Response('Unauthorized', { status: 403 })
    }

    await db.emotion.delete({
      where: {
        id: params.id,
      },
    })

    return new Response(null, { status: 204 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }
    return new Response(null, { status: 500 })
  }
}

export async function PUT(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context)

    const { userId } = auth()

    if (userId === null) {
      return new Response('Unauthorized', { status: 403 })
    }

    const json = await req.json()
    const body = emotionSchema.parse(json)

    await db.emotion.update({
      where: {
        id: params.id,
      },
      data: {
        emotion: body.emotion,
        color: body.color,
      },
    })

    return new Response(null, { status: 200 })
  } catch (error) {
    console.log(error)
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}
