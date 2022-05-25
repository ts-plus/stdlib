import { concreteSortedMap } from "@tsplus/stdlib/collections/SortedMap/_internal/SortedMapInternal"

/**
 * @tsplus fluent SortedMap headOption
 */
export function headOption<K, V>(self: SortedMap<K, V>): Option<Tuple<[K, V]>> {
  concreteSortedMap(self)
  return self.tree.first()
}
