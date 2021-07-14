import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

type GetDecksInput = Pick<Prisma.DeckFindManyArgs, "orderBy" | "skip" | "take">

export default resolver.pipe(
  resolver.authorize(),
  async ({ orderBy, skip = 0, take = 100 }: GetDecksInput, ctx) => {
    const {
      items: decks,
      nextPage,
      hasMore,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.deck.count(),
      query: (paginateArgs) =>
        db.deck.findMany({ ...paginateArgs, where: { userId: ctx.session.userId }, orderBy }),
    })

    return {
      decks,
      nextPage,
      hasMore,
      count,
    }
  }
)
