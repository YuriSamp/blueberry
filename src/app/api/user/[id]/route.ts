import { auth } from '@clerk/nextjs'
import { clerkClient } from '@clerk/nextjs/server'
import * as z from 'zod'

const routeContextSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
})

export async function PUT(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { userId } = auth()

    if (userId === null) {
      return new Response('Unauthorized', { status: 403 })
    }

    const json = await req.json()
    const body = z.string().parse(json)

    await clerkClient.users.updateUser(userId, { password: body })

    return new Response(null, { status: 200 })
  } catch (error) {
    console.log(error)
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { userId } = auth()

    if (userId === null) {
      return new Response('Unauthorized', { status: 403 })
    }

    await clerkClient.users.deleteUser(userId)

    return new Response(null, { status: 204 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }
    return new Response(null, { status: 500 })
  }
}
