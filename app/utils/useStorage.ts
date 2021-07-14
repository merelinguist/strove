import { dethunkify } from "app/utils/dethunkify"
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react"

export type JSONValue = string | number | boolean | JSONArray | JSONObject | null

interface JSONArray extends Array<JSONValue> {}

interface JSONObject {
  [key: string]: JSONValue
}

export const useStorage = <T extends JSONValue>(
  getStorage: () => Storage | null,
  key: string,
  initialValue: T | (() => T) | null = null,
  errorCallback?: (error: DOMException | TypeError) => void
): [T, Dispatch<SetStateAction<T>>] => {
  const storage = useMemo(() => {
    try {
      return getStorage()
    } catch {}

    return null
  }, [getStorage])

  const [value, setValue] = useState<T>(() => {
    const serializedValue = storage?.getItem(key)

    if (serializedValue == null) {
      return dethunkify(initialValue)
    }

    try {
      return JSON.parse(serializedValue)
    } catch {
      return serializedValue
    }
  })

  useEffect(() => {
    if (storage) {
      try {
        storage.setItem(key, JSON.stringify(value))
      } catch (error) {
        errorCallback?.(error)
      }
    }
  }, [errorCallback, key, storage, value])

  return [value, setValue]
}
