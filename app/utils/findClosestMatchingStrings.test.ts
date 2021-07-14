import { findClosestMatchingStrings } from "app/utils/findClosestMatchingStrings"

test("findClosestMatchingStrings", () => {
  expect(findClosestMatchingStrings("french", ["quebec", "123", "france", "frenc"])).toStrictEqual([
    "frenc",
  ])

  expect(findClosestMatchingStrings("iphone", ["ipod", "iphone 5s", "iphones x"])).toStrictEqual([
    "iphone 5s",
    "iphones x",
  ])

  expect(
    findClosestMatchingStrings("iphone", ["ipod", "iphone 5s", "iphones x"], 0.9)
  ).toStrictEqual([])

  expect(
    findClosestMatchingStrings("iphone", ["ipod", "iphone 5s", "iphones x"], 0.9)
  ).toStrictEqual([])

  expect(
    findClosestMatchingStrings("french", ["quebec", "123", "france", "frenc"], 0.9)
  ).toStrictEqual([])

  expect(
    findClosestMatchingStrings("iphone", ["ipod", "iphone 5s", "iphones x"], 0.9)
  ).toStrictEqual([])
})
