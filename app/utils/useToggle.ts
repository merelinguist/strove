import { Dispatch, SetStateAction, useCallback } from "react"

export const useToggle = ([value, setValue]: [boolean, Dispatch<SetStateAction<boolean>>]): [
  boolean,
  Dispatch<SetStateAction<boolean>>,
  () => void
] => {
  const toggleValue = useCallback(() => {
    setValue((prevValue) => !prevValue)
  }, [setValue])

  return [value, setValue, toggleValue]
}
