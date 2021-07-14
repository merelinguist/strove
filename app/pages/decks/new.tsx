import createDeck from "app/mutations/createDeck"
import { BlitzPage, Link, Routes, useMutation, useRouter } from "blitz"
import { useState } from "react"

const NewDeckPage: BlitzPage = () => {
  const router = useRouter()

  const [createDeckMutation] = useMutation(createDeck)

  const [name, setName] = useState("")
  const [cards, setCards] = useState("")

  return (
    <div className="prose mx-auto p-8">
      <h1>Create New Deck</h1>
      <form
        className="space-y-6"
        onSubmit={async (event) => {
          event.preventDefault()

          if (name.length === 0 || cards.length === 0) {
            return
          }

          try {
            const deck = await createDeckMutation({
              name,
              cards: cards.split(",").map((card) => ({
                front: card.split("/")[0] || "",
                back: card.split("/")[1] || "",
              })),
            })

            router.push(Routes.ShowDeckPage({ id: deck.id }))
          } catch (error) {
            alert(error)
          }
        }}
      >
        <label className="block">
          <span className="text-gray-700">Name</span>
          <input
            name="front"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="mt-1 block w-full"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Cards</span>
          <input
            name="back"
            type="text"
            value={cards}
            onChange={(event) => setCards(event.target.value)}
            className="mt-1 block w-full"
          />
        </label>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

NewDeckPage.authenticate = true

export default NewDeckPage
