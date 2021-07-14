import login from "app/mutations/login"
import { BlitzPage, ErrorFallbackProps, Routes, useMutation, useRouter } from "blitz"
import { useState } from "react"

const LoginPage: BlitzPage<{
  resetErrorBoundary?: ErrorFallbackProps["resetErrorBoundary"]
}> = ({ resetErrorBoundary }) => {
  const router = useRouter()
  const [loginMutation] = useMutation(login)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <div className="prose mx-auto p-8">
      <h1>Login</h1>
      <form
        onSubmit={async (event) => {
          event.preventDefault()

          try {
            await loginMutation({ email, password })

            resetErrorBoundary
              ? resetErrorBoundary()
              : router.push(
                  router.query.next
                    ? decodeURIComponent(router.query.next as string)
                    : Routes.IndexPage()
                )
          } catch (error) {
            alert(JSON.stringify(error))
          }
        }}
      >
        <input
          required
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

LoginPage.redirectAuthenticatedTo = Routes.IndexPage()

export default LoginPage
