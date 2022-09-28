/**
 * Constructs a new `MutableHashMap` from an array of key/value pairs.
 *
 * @tsplus static MutableHashMap.Ops from
 */
export function from<K, V>(
  entries: Collection<readonly [K, V]>
): MutableHashMap<K, V> {
  const map = MutableHashMap.empty<K, V>()

  for (const entry of entries) {
    map.set(entry[0], entry[1])
  }

  return map
}
