/**
 * Returns the number of elements contained within the map.
 *
 * @tsplus getter ImmutableMap size
 */
export function size<K, V>(self: ImmutableMap<K, V>): number {
  return self.internalMap.size
}
