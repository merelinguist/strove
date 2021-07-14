export const getMap = <Key, Value>(
  map: Map<Key, NonNullable<Value>>,
  key: Key,
  defaultValue?: NonNullable<Value>
): NonNullable<Value> => {
  const existing = map.get(key)

  if (existing === undefined) {
    if (defaultValue === undefined) {
      throw new Error("Key didn't exist and no defaultValue passed")
    }

    map.set(key, defaultValue)

    return defaultValue
  } else {
    return existing
  }
}
