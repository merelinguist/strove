import { DeleteCard } from "app/validations"
import { AuthorizationError, resolver } from "blitz"
import db from "db"

export default resolver.pipe(
  resolver.zod(DeleteCard),
  resolver.authorize(),
  async ({ id }, ctx) => {
    const card = await db.card.findUnique({ where: { id }, include: { deck: true } })

    if (card?.deck.userId !== ctx.session.userId) {
      throw new AuthorizationError()
    }

    await db.card.delete({ where: { id } })

    return card
  }
)
