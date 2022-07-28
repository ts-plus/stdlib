/**
 * Returns a `Some` containing the value associated with the specified key from
 * the map, or `None` if the key/value pair is not present within the map.
 *
 * @tsplus static ImmutableMap.Aspects get
 * @tsplus pipeable ImmutableMap get
 */
export function get<K>(key: K) {
  return <V>(self: ImmutableMap<K, V>): Maybe<V> =>
    self.internalMap.has(key) ? Maybe.some(self.internalMap.get(key)!) : Maybe.none
}
