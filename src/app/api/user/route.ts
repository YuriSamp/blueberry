import { auth } from '@clerk/nextjs'
import { clerkClient } from '@clerk/nextjs/server'
import * as z from 'zod'

export async function DELETE() {
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
