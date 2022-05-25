import { concreteSortedMap } from "@tsplus/stdlib/collections/SortedMap/_internal/SortedMapInternal"

/**
 * @tsplus fluent SortedMap get
 */
export function get_<K, V>(self: SortedMap<K, V>, key: K): Option<V> {
  concreteSortedMap(self)
  return self.tree.findFirst(key)
}

/**
 * @tsplus static SortedMap/Aspects get
 */
export const get = Pipeable(get_)
