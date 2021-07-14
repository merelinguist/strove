import { Register } from "app/validations"
import { resolver, SecurePassword } from "blitz"
import db from "db"

export default resolver.pipe(resolver.zod(Register), async ({ email, password }, ctx) => {
  const hashedPassword = await SecurePassword.hash(password.trim())

  const user = await db.user.create({
    data: { email: email.toLowerCase().trim(), hashedPassword, role: "USER" },
    select: { id: true, name: true, email: true, role: true },
  })

  await ctx.session.$create({ userId: user.id, role: user.role })

  return user
})
