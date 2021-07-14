import { z } from "zod"

const password = z.string().min(8).max(100)

export const ChangePassword = z.object({
  currentPassword: z.string(),
  newPassword: password,
})

export const CreateDeck = z.object({
  name: z.string(),
  cards: z.array(z.object({ front: z.string(), back: z.string() })),
})

export const CreateResponses = z.array(z.object({ correctness: z.number(), cardId: z.string() }))

export const DeleteCard = z.object({
  id: z.string(),
})

export const DeleteDeck = z.object({
  id: z.string(),
})

export const ForgotPassword = z.object({
  email: z.string().email(),
})

export const Login = z.object({
  email: z.string().email(),
  password: z.string(),
})

export const Register = z.object({
  email: z.string().email(),
  password,
})

export const ResetPassword = z
  .object({
    password: password,
    passwordConfirmation: password,
    token: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ["passwordConfirmation"],
  })

export const UpdateCard = z.object({
  id: z.string(),
  front: z.string(),
  back: z.string(),
})
