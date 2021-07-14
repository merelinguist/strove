import { QuizProvider, useQuiz } from "app/contexts/QuizContext"
import createResponses from "app/mutations/createResponses"
import getDeck from "app/queries/getDeck"
import { compareTwoStrings } from "app/utils/compareTwoStrings"
import { BlitzPage, Routes, useMutation, useParam, useQuery, useRouter } from "blitz"
import { useEffect } from "react"
import { useRef } from "react"
import { useState } from "react"

const squares: null[] = Array(9).fill(null)

const Quiz = () => {
  const router = useRouter()
  const id = useParam("id", "string")
  const [{ cards }] = useQuery(getDeck, { id })
  cards.length = 10
  const {
    state: { isSubmitting, responses },
    dispatch,
  } = useQuiz()
  const [response, setResponse] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const continueButtonRef = useRef<HTMLButtonElement>(null)
  const finishButtonRef = useRef<HTMLButtonElement>(null)
  const [createResponsesMutation] = useMutation(createResponses)

  const card = cards[responses.length]
  const correctness = compareTwoStrings((card && card.back) || "", response)

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus()
    }

    if (continueButtonRef && continueButtonRef.current) {
      continueButtonRef.current.focus()
    }

    if (!card && finishButtonRef && finishButtonRef.current) {
      finishButtonRef.current.focus()
    }
  }, [card, isSubmitting])

  if (!card) {
    return (
      <div className="prose mx-auto p-8">
        <h1>
          {responses.length} / {cards.length} victory
        </h1>
        <button
          type="button"
          ref={finishButtonRef}
          onClick={async () => {
            try {
              await createResponsesMutation(responses)

              router.push(Routes.ShowDeckPage({ id: id as string }))
            } catch (error) {
              alert(error)
            }
          }}
        >
          Finish
        </button>
        <pre>{JSON.stringify(responses, null, 2)}</pre>
      </div>
    )
  }

  return (
    <div className="prose mx-auto p-8">
      <h1>
        hello - {responses.length} / {cards.length}
      </h1>
      <form
        onSubmit={(event) => {
          event.preventDefault()

          if (response.length === 0) {
            return
          }

          dispatch({ type: "setSubmitting", isSubmitting: true })
        }}
      >
        <label className="block">
          <span className="text-gray-700">{card.front}</span>
          <input
            ref={inputRef}
            name="response"
            type="text"
            disabled={isSubmitting}
            className="mt-1 block w-full"
            value={response}
            onChange={(event) => setResponse(event.target.value)}
          />
        </label>
        {isSubmitting ? (
          <button
            onClick={() => {
              dispatch({ type: "setSubmitting", isSubmitting: false })
              dispatch({ type: "addResponse", correctness, cardId: card.id })
              setResponse("")
            }}
            ref={continueButtonRef}
            type="button"
          >
            Continue
          </button>
        ) : (
          <button type="submit">Check</button>
        )}
      </form>
    </div>
  )
}

const QuizPage: BlitzPage = () => (
  <QuizProvider>
    <Quiz />
  </QuizProvider>
)

QuizPage.authenticate = true

export default QuizPage
