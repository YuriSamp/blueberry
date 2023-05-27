import { currentUser } from '@clerk/nextjs'
import { db } from '@lib/db'
import { pageSchema } from '@lib/validations/diary'
import * as z from 'zod'

const routeContextSchema = z.object({
  params: z.object({
    pageId: z.string(),
  }),
})

export async function DELETE(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context)

    if (!(await verifyCurrentUserHasAccessToPost(params.pageId))) {
      return new Response(null, { status: 403 })
    }

    await db.page.delete({
      where: {
        id: params.pageId as string,
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

    if (!(await verifyCurrentUserHasAccessToPost(params.pageId))) {
      return new Response(null, { status: 403 })
    }

    const json = await req.json()
    const body = pageSchema.parse(json)

    await db.page.update({
      where: {
        id: params.pageId,
      },
      data: {
        title: body.title,
        date: body.date,
        emotion: body.emotion,
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

  const count = await db.page.count({
    where: {
      id: postId,
      authorId: user?.id,
    },
  })

  return count > 0
}
