import { JSONValue, useStorage } from "app/utils/useStorage"
import { Dispatch, SetStateAction } from "react"

const getLocalStorage = (): Storage => localStorage

export const useLocalStorage = <T extends JSONValue>(
  key: string,
  initialValue: T | (() => T) | null = null,
  errorCallback?: (error: DOMException | TypeError) => void
): [T, Dispatch<SetStateAction<T>>] => useStorage(getLocalStorage, key, initialValue, errorCallback)
