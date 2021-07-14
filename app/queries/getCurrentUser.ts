import { Ctx } from "blitz"
import db from "db"

const getCurrentUser = async (_ = null, { session }: Ctx) => {
  if (!session.userId) {
    return null
  }

  const user = await db.user.findUnique({
    where: { id: session.userId },
    select: { id: true, name: true, email: true, role: true },
  })

  return user
}

export default getCurrentUser
