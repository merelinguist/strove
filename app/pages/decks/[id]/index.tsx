import { Card } from "app/components/Card"
import { Nav } from "app/components/Nav"
import deleteDeck from "app/mutations/deleteDeck"
import getDeck from "app/queries/getDeck"
import { Link, Routes, useMutation, useParam, useQuery, useRouter } from "blitz"

const ShowDeckPage = () => {
  const router = useRouter()
  const id = useParam("id", "string")
  const [deleteDeckMutation, { isLoading }] = useMutation(deleteDeck)

  const [deck] = useQuery(getDeck, { id })

  return (
    <div className="prose mx-auto p-8">
      <Nav />
      <h1>{deck.name}</h1>
      <Link href={Routes.QuizPage({ id: id as string })}>
        <a>Quiz</a>
      </Link>

      <button
        type="button"
        onClick={async () => {
          if (window.confirm("This will be deleted")) {
            await deleteDeckMutation({ id: deck.id })

            router.push(Routes.DashboardPage())
          }
        }}
      >
        {isLoading ? "Deleting" : "Delete"}
      </button>

      <ol>
        {deck.cards.map((card) => (
          <Card card={card} key={card.id} />
        ))}
      </ol>
    </div>
  )
}

export default ShowDeckPage
