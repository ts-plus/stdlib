import { concreteSortedMap } from "@tsplus/stdlib/collections/SortedMap/_internal/SortedMapInternal"

/**
 * @tsplus getter SortedMap size
 */
export function size<K, V>(self: SortedMap<K, V>): number {
  concreteSortedMap(self)
  return self.tree.size
}
