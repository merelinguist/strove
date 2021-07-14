import db from "db"
import faker from "faker"

const seed = async () => {
  const email = "cinna@mek.com"

  const user = await db.user.findUnique({ where: { email } })

  if (!user) {
    throw new Error(`User with email: ${email} not found`)
  }

  await db.response.deleteMany()
  await db.card.deleteMany()
  await db.deck.deleteMany()

  for (let i = 0; i < 5; i++) {
    await db.deck.create({
      data: {
        name: "Deck " + i,
        userId: user.id,
        cards: {
          createMany: {
            data: [...Array(50)].map(() => {
              const name = faker.name.firstName()

              return { front: name, back: name }
            }),
          },
        },
      },
    })
  }

  const decks = await db.deck.findMany({
    where: { userId: user.id },
    include: { cards: true },
  })

  if (!decks) {
    throw new Error("User has no decks")
  }

  const deck = decks[0]

  if (!deck) {
    throw new Error("User has no decks")
  }

  const oldCard = deck.cards[25]

  if (!oldCard) {
    throw new Error("Deck does not have enough cards")
  }

  await db.response.createMany({
    data: [
      ...deck.cards
        .map((card) => card.id)
        .splice(0, Math.ceil(deck.cards.map((card) => card.id).length / 2))
        .map((cardId) => ({
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
          correctness: 1,
          userId: user.id,
          cardId,
        })),
      {
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
        correctness: 1,
        userId: user.id,
        cardId: oldCard.id,
      },
    ],
  })
}

export default seed
