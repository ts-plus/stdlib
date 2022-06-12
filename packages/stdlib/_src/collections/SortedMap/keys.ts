import { concreteSortedMap } from "@tsplus/stdlib/collections/SortedMap/_internal/SortedMapInternal"

/**
 * @tsplus getter SortedMap keys
 */
export function keys<K, V>(self: SortedMap<K, V>): IterableIterator<K> {
  concreteSortedMap(self)
  return self.tree.keys()
}
