/**
 * Filters out `None` values from a map whose values are of type `Option<V>`.
 *
 * @tsplus fluent ImmutableMap compact
 */
export function compact<K, V>(self: ImmutableMap<K, Option<V>>): ImmutableMap<K, V> {
  const map = new Map<K, V>()
  for (const [key, value] of self.internalMap) {
    if (value.isSome()) {
      map.set(key, value.value)
    }
  }
  return new ImmutableMap(map)
}
