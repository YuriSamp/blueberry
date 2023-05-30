import { db } from '@lib/db'
import { pageSchema, updatePageSchema } from '@lib/validations/diary'
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
    const id = req.url?.split('=')[1]

    await db.page.delete({
      where: {
        id: id as string,
      },
    })

    return new Response(null, { status: 204 })
  } catch (error) {
    console.log(error)
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
    const pageId = req.url?.split('=')[1]

    const json = await req.json()
    const body = updatePageSchema.parse({ ...json, date: new Date(json.date) })

    await db.page.update({
      where: {
        id: pageId,
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
