/**
 * @tsplus fluent SortedMap entries
 */
export function entries<K, V>(self: SortedMap<K, V>): Iterator<Tuple<[K, V]>> {
  return self[Symbol.iterator]();
}
