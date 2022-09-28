/**
 * @tsplus getter SortedMap entries
 */
export function entries<K, V>(self: SortedMap<K, V>): Iterator<readonly [K, V]> {
  return self[Symbol.iterator]()
}
