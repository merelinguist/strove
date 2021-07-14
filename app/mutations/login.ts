import { authenticateUser } from "app/utils/authenticateUser"
import { Login } from "app/validations"
import { resolver } from "blitz"
import db, { Role } from "db"

export default resolver.pipe(resolver.zod(Login), async ({ email, password }, ctx) => {
  const user = await authenticateUser(email, password)

  await ctx.session.$create({ userId: user.id, role: user.role as Role })

  return user
})
