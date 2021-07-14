import { DeleteDeck } from "app/validations"
import { AuthorizationError, resolver } from "blitz"
import db from "db"

export default resolver.pipe(
  resolver.zod(DeleteDeck),
  resolver.authorize(),
  async ({ id }, ctx) => {
    const deck = await db.deck.findUnique({ where: { id } })

    if (deck && deck.userId !== ctx.session.userId) {
      throw new AuthorizationError()
    }

    await db.deck.delete({ where: { id } })

    return deck
  }
)
