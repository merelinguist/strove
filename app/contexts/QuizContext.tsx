import { createContext, ReactNode, useContext, useReducer } from "react"

type Action =
  | { type: "setSubmitting"; isSubmitting: boolean }
  | { type: "addResponse"; correctness: number; cardId: string }

type Dispatch = (action: Action) => void

type State = {
  isSubmitting: boolean
  responses: { correctness: number; cardId: string }[]
}

const QuizStateContext = createContext<{ state: State; dispatch: Dispatch } | undefined>(undefined)

const quizReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "setSubmitting": {
      return {
        isSubmitting: action.isSubmitting,
        responses: state.responses,
      }
    }
    case "addResponse": {
      return {
        isSubmitting: state.isSubmitting,
        responses: [...state.responses, { correctness: action.correctness, cardId: action.cardId }],
      }
    }
    default: {
      // @ts-expect-error
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

type QuizProviderProps = { children: ReactNode }

const QuizProvider = ({ children }: QuizProviderProps) => {
  const [state, dispatch] = useReducer(quizReducer, {
    isSubmitting: false,
    responses: [],
  })

  const value = { state, dispatch }

  return <QuizStateContext.Provider value={value}>{children}</QuizStateContext.Provider>
}

const useQuiz = () => {
  const context = useContext(QuizStateContext)

  if (context === undefined) {
    throw new Error("useQuiz must be used within a QuizProvider")
  }

  return context
}

export { QuizProvider, useQuiz }
