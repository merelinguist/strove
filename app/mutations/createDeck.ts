import { CreateDeck } from "app/validations"
import { resolver } from "blitz"
import db from "db"

export default resolver.pipe(
  resolver.zod(CreateDeck),
  resolver.authorize(),
  async ({ name }, ctx) => {
    const deck = await db.deck.create({ data: { name, userId: ctx.session.userId } })

    return deck
  }
)
