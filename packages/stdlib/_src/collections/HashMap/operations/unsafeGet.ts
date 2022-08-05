/**
 * Unsafely lookup the value for the specified key in the `HashMap` using the
 * internal hashing function.
 *
 * @tsplus static HashMap.Aspects unsafeGet
 * @tsplus pipeable HashMap unsafeGet
 */
export function unsafeGet<K, V>(key: K) {
  return (self: HashMap<K, V>): V => {
    const element = self.getHash(key, Hash.unknown(key))
    if (element.isNone()) {
      throw new NoSuchElement()
    }
    return element.value
  }
}
