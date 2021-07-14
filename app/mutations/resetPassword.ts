import login from "app/mutations/login"
import { ResetPassword } from "app/validations"
import { hash256, resolver, SecurePassword } from "blitz"
import db from "db"

class ResetPasswordError extends Error {
  name = "ResetPasswordError"
  message = "Reset password link is invalid or it has expired."
}

export default resolver.pipe(resolver.zod(ResetPassword), async ({ password, token }, ctx) => {
  const hashedToken = hash256(token)

  const possibleToken = await db.token.findFirst({
    where: { hashedToken, type: "RESET_PASSWORD" },
    include: { user: true },
  })

  if (!possibleToken) {
    throw new ResetPasswordError()
  }

  const savedToken = possibleToken

  await db.token.delete({ where: { id: savedToken.id } })

  if (savedToken.expiresAt < new Date()) {
    throw new ResetPasswordError()
  }

  const hashedPassword = await SecurePassword.hash(password.trim())

  const user = await db.user.update({
    where: { id: savedToken.userId },
    data: { hashedPassword },
  })

  await db.session.deleteMany({ where: { userId: user.id } })

  await login({ email: user.email, password }, ctx)

  return true
})
