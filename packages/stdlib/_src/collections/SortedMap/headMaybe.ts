import { concreteSortedMap } from "@tsplus/stdlib/collections/SortedMap/_internal/SortedMapInternal"

/**
 * @tsplus getter SortedMap headMaybe
 */
export function headMaybe<K, V>(self: SortedMap<K, V>): Maybe<readonly [K, V]> {
  concreteSortedMap(self)
  return self.tree.first
}
