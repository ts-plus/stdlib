import { concreteSortedMap } from "@tsplus/stdlib/collections/SortedMap/_internal/SortedMapInternal"

/**
 * @tsplus getter SortedMap headOption
 */
export function headOption<K, V>(self: SortedMap<K, V>): Maybe<Tuple<[K, V]>> {
  concreteSortedMap(self)
  return self.tree.first
}
