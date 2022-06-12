/**
 * Copies each element of an `ImmutableMap` into a new `ImmutableMap`.
 *
 * @tsplus getter ImmutableMap copy
 */
export function copy<K, V>(self: ImmutableMap<K, V>): ImmutableMap<K, V> {
  const map = new Map<K, V>()
  for (const [key, value] of self.internalMap) {
    map.set(key, value)
  }
  return new ImmutableMap(map)
}
