import logout from "app/mutations/logout"
import { Link, Routes, useMutation } from "blitz"

export const Nav = () => {
  const [logoutMutation] = useMutation(logout)

  return (
    <ul>
      <li>
        <Link href={Routes.DashboardPage()}>
          <a>Dashboard</a>
        </Link>
      </li>
      <li>
        <Link href={Routes.HomePage()}>
          <a>Home</a>
        </Link>
      </li>
      <li>
        <Link href={Routes.IndexPage()}>
          <a>Index</a>
        </Link>
      </li>
      <li>
        <Link href={Routes.LoginPage()}>
          <a>Login</a>
        </Link>
      </li>
      <li>
        <button
          className="inline text-gray-900 underline font-medium"
          style={{ margin: 0 }}
          onClick={async () => {
            await logoutMutation()
          }}
        >
          Logout
        </button>
      </li>
    </ul>
  )
}
