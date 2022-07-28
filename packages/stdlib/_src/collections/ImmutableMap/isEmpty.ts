/**
 * Returns `true` if the map contains no entries, otherwise returns `false`.
 *
 * @tsplus getter ImmutableMap isEmpty
 */
export function isEmpty<K, V>(self: ImmutableMap<K, V>): boolean {
  return self.internalMap.size === 0
}
