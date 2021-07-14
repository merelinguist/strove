import { UpdateCard } from "app/validations"
import { AuthorizationError, resolver } from "blitz"
import db from "db"

export default resolver.pipe(
  resolver.zod(UpdateCard),
  resolver.authorize(),
  async ({ id, front, back }, ctx) => {
    const card = await db.card.findUnique({ where: { id }, include: { deck: true } })

    if (card?.deck.userId !== ctx.session.userId) {
      throw new AuthorizationError()
    }

    const updatedCard = await db.card.update({ where: { id }, data: { front, back } })

    return updatedCard
  }
)
