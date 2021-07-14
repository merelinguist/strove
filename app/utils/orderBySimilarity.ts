import { compareTwoStrings } from "app/utils/compareTwoStrings"

type OrderBySimilarityOptions = {
  minRating?: number
  ignoreCase?: boolean
}

type Rating = {
  target: string
  rating: number
}

export const orderBySimilarity = (
  compareStr: string,
  targets: string[],
  { minRating, ignoreCase = false }: OrderBySimilarityOptions = {}
): Rating[] => {
  if (targets.length === 0) {
    return []
  }

  const ratings: Rating[] = Array.from(targets, (target: string): Rating => {
    if (ignoreCase) {
      return {
        target,
        rating: compareTwoStrings(compareStr.toLowerCase(), target.toLowerCase()),
      }
    }

    return {
      target,
      rating: compareTwoStrings(compareStr, target),
    }
  })

  const sortedRatings: Rating[] = ratings
    .sort((a, b) => {
      return b.rating - a.rating
    })
    .filter((item) => minRating === undefined || item.rating >= minRating)

  return sortedRatings
}
