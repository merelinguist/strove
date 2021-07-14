import { AuthorizationError, resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateDeck = z.object({
  id: z.string(),
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateDeck),
  resolver.authorize(),
  async ({ id, name }, ctx) => {
    const user = await db.user.findUnique({
      where: { id: ctx.session.userId },
      include: { decks: true },
    })

    if (user && user.decks.filter((deck) => deck.id === id).length === 0) {
      throw new AuthorizationError()
    }

    const deck = await db.deck.update({ where: { id }, data: { name } })

    return deck
  }
)
