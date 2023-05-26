import { currentUser } from '@clerk/nextjs'
import { db } from '@lib/db'
import { pageSchema } from '@lib/validations/diary'
import * as z from 'zod'

const routeContextSchema = z.object({
  params: z.object({
    postId: z.string(),
  }),
})

export async function DELETE(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context)

    if (!(await verifyCurrentUserHasAccessToPost(params.postId))) {
      return new Response(null, { status: 403 })
    }

    await db.post.delete({
      where: {
        id: params.postId as string,
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

    if (!(await verifyCurrentUserHasAccessToPost(params.postId))) {
      return new Response(null, { status: 403 })
    }

    const json = await req.json()
    const body = pageSchema.parse(json)

    await db.post.update({
      where: {
        id: params.postId,
      },
      data: {
        title: body.title,
        date: body.date,
        emotino: body.emotion,
        text: body.text,
        color: body.color,
        id: body.id,
      },
    })

    return new Response(null, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}

async function verifyCurrentUserHasAccessToPost(postId: string) {
  const user = await currentUser()

  const count = await db.post.count({
    where: {
      id: postId,
      authorId: user?.id,
    },
  })

  return count > 0
}
