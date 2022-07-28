/**
 * Returns a `Some` containing the value associated with the specified key from
 * the map, or `None` if the key/value pair is not present within the map.
 *
 * @tsplus static ImmutableMap.Aspects unsafeGet
 * @tsplus pipeable ImmutableMap unsafeGet
 */
export function unsafeGet<K>(key: K) {
  return <V>(self: ImmutableMap<K, V>): V => {
    if (!self.internalMap.has(key)) {
      throw new NoSuchElement()
    }
    return self.internalMap.get(key)!
  }
}
