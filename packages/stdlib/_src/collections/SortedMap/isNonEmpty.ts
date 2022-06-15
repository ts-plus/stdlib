/**
 * @tsplus getter SortedMap isNonEmpty
 */
export function isNonEmpty<K, V>(self: SortedMap<K, V>): boolean {
  return !self.isEmpty
}
