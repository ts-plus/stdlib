import { concreteSortedMap } from "@tsplus/stdlib/collections/SortedMap/_internal/SortedMapInternal"

/**
 * @tsplus fluent SortedMap values
 */
export function values<K, V>(self: SortedMap<K, V>): IterableIterator<V> {
  concreteSortedMap(self)
  return self.tree.values()
}
