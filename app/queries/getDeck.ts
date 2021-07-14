import { score } from "app/utils/score"
import { NotFoundError, resolver } from "blitz"
import db from "db"
import { z } from "zod"

const GetDeck = z.object({
  id: z.string().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetDeck), resolver.authorize(), async ({ id }) => {
  const deck = await db.deck.findUnique({
    where: { id },
    include: { cards: { include: { responses: true }, orderBy: { createdAt: "asc" } } },
  })

  if (!deck) {
    throw new NotFoundError()
  }

  deck.cards.sort((card, card1) => score(card.responses) - score(card1.responses))

  return deck
})
