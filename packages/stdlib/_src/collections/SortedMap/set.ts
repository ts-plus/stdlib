import {
  concreteSortedMap,
  SortedMapInternal
} from "@tsplus/stdlib/collections/SortedMap/_internal/SortedMapInternal"

/**
 * @tsplus static SortedMap.Aspects set
 * @tsplus pipeable SortedMap set
 */
export function set<K, V>(key: K, value: V) {
  return (self: SortedMap<K, V>): SortedMap<K, V> => {
    concreteSortedMap(self)
    return new SortedMapInternal(
      self.tree.has(key)
        ? self.tree.removeFirst(key).insert(key, value)
        : self.tree.insert(key, value)
    )
  }
}
