/**
 * @tsplus getter SortedMap isEmpty
 */
export function isEmpty<K, V>(self: SortedMap<K, V>): boolean {
  return self.size === 0
}
