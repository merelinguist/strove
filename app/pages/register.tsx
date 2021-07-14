import register from "app/mutations/register"
import { Routes, useMutation, useRouter } from "blitz"
import { useState } from "react"

const RegisterPage = () => {
  const router = useRouter()
  const [registerMutation] = useMutation(register)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <div className="prose mx-auto p-8">
      <h1>Register</h1>
      <form
        onSubmit={async (event) => {
          event.preventDefault()

          try {
            await registerMutation({ email, password })

            router.push(Routes.IndexPage())
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

export default RegisterPage
