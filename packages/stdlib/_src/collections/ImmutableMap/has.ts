/**
 * Returns `true` if the map contains the specified key, otherwise returns
 * `false`.
 *
 * @tsplus static ImmutableMap.Aspects has
 * @tsplus pipeable ImmutableMap has
 */
export function has<K>(key: K) {
  return <V>(self: ImmutableMap<K, V>): boolean => self.internalMap.has(key)
}
