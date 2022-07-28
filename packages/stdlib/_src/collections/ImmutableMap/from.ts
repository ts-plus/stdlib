/**
 * Creates a new `ImmutableMap` from a set of entries.
 *
 * @tsplus static ImmutableMap.Ops from
 */
export function from<K, V>(
  entries: Collection<Tuple<[K, V]>>
): ImmutableMap<K, V> {
  const map = new Map()
  for (const { tuple: [key, value] } of entries) {
    map.set(key, value)
  }
  return new ImmutableMap(map)
}
