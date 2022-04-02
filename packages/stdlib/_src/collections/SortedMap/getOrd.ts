import { concreteSortedMap } from "@tsplus/stdlib/collections/SortedMap/_internal/SortedMapInternal";

/**
 * @tsplus fluent SortedMap getOrd
 */
export function getOrd<K, V>(self: SortedMap<K, V>): Ord<K> {
  concreteSortedMap(self);
  return self.tree.ord;
}
