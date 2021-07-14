import { CreateResponses } from "app/validations"
import { resolver } from "blitz"
import db from "db"

export default resolver.pipe(
  resolver.zod(CreateResponses),
  resolver.authorize(),
  async (data, ctx) => {
    const responses = await db.response.createMany({
      data: data.map((response) => ({ ...response, userId: ctx.session.userId })),
    })

    return responses
  }
)
