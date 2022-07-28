import { concreteSortedMap } from "@tsplus/stdlib/collections/SortedMap/_internal/SortedMapInternal"

/**
 * @tsplus static SortedMap.Aspects get
 * @tsplus pipeable SortedMap get
 */
export function get<K>(key: K) {
  return <V>(self: SortedMap<K, V>): Maybe<V> => {
    concreteSortedMap(self)
    return self.tree.findFirst(key)
  }
}
