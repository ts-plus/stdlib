/**
 * @tsplus getter HashMap toCollection
 */
export function toCollection<K, V>(self: HashMap<K, V>): Collection<Tuple<[K, V]>> {
  return self
}
