import { Disclosure } from "@headlessui/react"
import deleteCard from "app/mutations/deleteCard"
import updateCard from "app/mutations/updateCard"
import getDeck from "app/queries/getDeck"
import { score } from "app/utils/score"
import { useMutation, useParam, useQuery } from "blitz"
import { Card as PrismaCard, Response } from "db"
import { useRef } from "react"

type CardProps = {
  card: PrismaCard & {
    responses: Response[]
  }
}

export const Card = ({ card }: CardProps) => {
  const id = useParam("id", "string")
  const [deleteCardMutation] = useMutation(deleteCard)
  const [updateCardMutation] = useMutation(updateCard)

  const [, { refetch }] = useQuery(getDeck, { id })

  const buttonRef = useRef<HTMLButtonElement>(null)

  return (
    <Disclosure as="li">
      <Disclosure.Button ref={buttonRef} style={{ margin: 0 }}>
        {card.front} ({score(card.responses).toPrecision(3)})
      </Disclosure.Button>
      <Disclosure.Panel style={{ margin: 0 }} className="text-gray-500 space-y-4">
        <form
          className="space-y-4"
          onSubmit={async (event) => {
            event.preventDefault()

            const formData = new FormData(event.target as HTMLFormElement)

            const front = formData.get("front") as string
            const back = formData.get("back") as string

            await updateCardMutation({ id: card.id, front, back })

            buttonRef.current?.click()
            buttonRef.current?.focus()

            refetch()
          }}
        >
          <label className="block">
            <span className="text-gray-700">Front</span>
            <input
              name="front"
              type="text"
              defaultValue={card.front}
              className="mt-1 block w-full"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Back</span>
            <input name="back" type="text" defaultValue={card.back} className="mt-1 block w-full" />
          </label>
          <button className="inline text-gray-900 underline font-medium" type="submit">
            Edit
          </button>
        </form>
        <button
          className="inline text-gray-900 underline font-medium"
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteCardMutation({ id: card.id })

              refetch()
            }
          }}
        >
          Delete
        </button>
      </Disclosure.Panel>
    </Disclosure>
  )
}
