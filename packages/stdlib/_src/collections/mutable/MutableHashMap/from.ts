/**
 * Constructs a new `MutableHashMap` from an array of key/value pairs.
 *
 * @tsplus static MutableHashMap/Ops from
 */
export function from<K, V>(
  entries: Collection<Tuple<[K, V]>>
): MutableHashMap<K, V> {
  const map = MutableHashMap.empty<K, V>()

  for (const entry of entries) {
    map.set(entry.get(0), entry.get(1))
  }

  return map
}
