/**
 * @tsplus getter HashMap toCollection
 */
export function toCollection<K, V>(self: HashMap<K, V>): Collection<readonly [K, V]> {
  return self
}
