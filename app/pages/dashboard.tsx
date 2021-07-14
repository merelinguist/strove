import { Nav } from "app/components/Nav"
import getCurrentUser from "app/queries/getCurrentUser"
import getDecks from "app/queries/getDecks"
import { BlitzPage, Link, Routes, usePaginatedQuery, useQuery, useRouter } from "blitz"

const ITEMS_PER_PAGE = 100

const DashboardPage: BlitzPage = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0

  const [user] = useQuery(getCurrentUser, undefined)
  const [{ decks }] = usePaginatedQuery(getDecks, {
    orderBy: { createdAt: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  if (!user) {
    return null
  }

  return (
    <div className="prose mx-auto p-8">
      <Nav />
      <h1>Dashboard - Welcome back, {user.name || user.email}</h1>
      <ul>
        {decks.map((deck) => (
          <li key={deck.id}>
            <Link href={Routes.ShowDeckPage({ id: deck.id })}>
              <a>{deck.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

// DashboardPage.authenticate = true

export default DashboardPage
