/**
 * Constructs a new `HashMap` from an array of key/value pairs.
 *
 * @tsplus static HashMap/Ops from
 */
export function from<K, V>(
  entries: Collection<Tuple<[K, V]>>
): HashMap<K, V> {
  const map = HashMap.empty<K, V>().beginMutation

  for (const entry of entries) {
    map.set(entry.get(0), entry.get(1))
  }

  return map.endMutation
}
