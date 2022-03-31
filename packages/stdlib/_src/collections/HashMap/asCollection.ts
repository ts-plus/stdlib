/**
 * @tsplus fluent HashMap asCollection
 */
export function asCollection<K, V>(self: HashMap<K, V>): Collection<readonly [K, V]> {
  return self;
}
