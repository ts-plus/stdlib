import { concreteSortedMap, SortedMapInternal } from "@tsplus/stdlib/collections/SortedMap/_internal/SortedMapInternal"

/**
 * @tsplus fluent SortedMap set
 */
export function set_<K, V>(self: SortedMap<K, V>, key: K, value: V): SortedMap<K, V> {
  concreteSortedMap(self)
  return new SortedMapInternal(
    self.tree.has(key)
      ? self.tree.removeFirst(key).insert(key, value)
      : self.tree.insert(key, value)
  )
}

/**
 * @tsplus static SortedMap/Aspects set
 */
export const set = Pipeable(set_)
