import { auth } from '@clerk/nextjs'
import { db } from '@lib/db'
import { updatePageSchema } from '@lib/validations/diary'
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

    if (!(await verifyCurrentUserHasAccessToPost(params.id))) {
      return new Response(null, { status: 403 })
    }

    await db.page.delete({
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

export async function PATCH(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context)

    if (!(await verifyCurrentUserHasAccessToPost(params.id))) {
      return new Response(null, { status: 403 })
    }

    const json = await req.json()
    const body = updatePageSchema.parse({ ...json, date: new Date(json.date) })

    await db.page.update({
      where: {
        id: params.id,
      },
      data: {
        title: body.title,
        date: body.date,
        emotion: body.emotion,
        text: body.text,
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

async function verifyCurrentUserHasAccessToPost(postId: string) {
  const { userId } = auth()

  if (userId === null) {
    return new Response('Unauthorized', { status: 403 })
  }

  const count = await db.page.count({
    where: {
      id: postId,
      authorId: userId,
    },
  })

  return count > 0
}
