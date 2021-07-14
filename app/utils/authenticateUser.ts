import { AuthenticationError, SecurePassword } from "blitz"
import db from "db"

export const authenticateUser = async (rawEmail: string, rawPassword: string) => {
  const email = rawEmail.toLowerCase().trim()
  const password = rawPassword.trim()

  const user = await db.user.findFirst({ where: { email } })

  if (!user) {
    throw new AuthenticationError()
  }

  const result = await SecurePassword.verify(user.hashedPassword, password)

  if (result === SecurePassword.VALID_NEEDS_REHASH) {
    const improvedHash = await SecurePassword.hash(password)

    await db.user.update({ where: { id: user.id }, data: { hashedPassword: improvedHash } })
  }

  const { hashedPassword, ...rest } = user

  return rest
}
