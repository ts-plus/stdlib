/**
 * Returns a `Some` containing the value associated with the specified key from
 * the map, or `None` if the key/value pair is not present within the map.
 *
 * @tsplus fluent ImmutableMap get
 */
export function get_<K, V>(self: ImmutableMap<K, V>, key: K): Maybe<V> {
  return self.internalMap.has(key) ? Maybe.some(self.internalMap.get(key)!) : Maybe.none
}

/**
 * Returns a `Some` containing the value associated with the specified key from
 * the map, or `None` if the key/value pair is not present within the map.
 *
 * @tsplus fluent ImmutableMap get
 */
export const get = Pipeable(get_)
