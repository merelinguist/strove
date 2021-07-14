import { Response } from "db"

const TAO = 1000 * 60 * 60 * 24

export const score = (responses: Response[]): number => {
  if (responses.length === 0) {
    return -1
  }

  const now = Date.now()

  const weightedSum = responses
    .map((response) => response.correctness * Math.exp((response.createdAt.getTime() - now) / TAO))
    .reduce((accumulator, currentValue) => accumulator + currentValue)

  return weightedSum / responses.length
}
