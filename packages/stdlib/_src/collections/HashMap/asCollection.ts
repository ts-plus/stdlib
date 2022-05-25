/**
 * @tsplus fluent HashMap asCollection
 */
export function asCollection<K, V>(self: HashMap<K, V>): Collection<Tuple<[K, V]>> {
  return self
}
