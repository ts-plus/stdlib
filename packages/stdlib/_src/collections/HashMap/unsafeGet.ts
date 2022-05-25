/**
 * Unsafely lookup the value for the specified key in the `HashMap` using the
 * internal hashing function.
 *
 * @tsplus fluent HashMap unsafeGet
 */
export function unsafeGet_<K, V>(self: HashMap<K, V>, key: K): V {
  const element = self.getHash(key, Hash.unknown(key))
  if (element.isNone()) {
    throw new NoSuchElement()
  }
  return element.value
}

/**
 * Unsafely lookup the value for the specified key in the `HashMap` using the
 * internal hashing function.
 *
 * @ets_data_first unsafeGet_
 */
export const unsafeGet = Pipeable(unsafeGet_)
