import {
  concreteSortedMap,
  SortedMapInternal
} from "@tsplus/stdlib/collections/SortedMap/_internal/SortedMapInternal"

/**
 * @tsplus fluent SortedMap remove
 */
export function remove_<K, V>(self: SortedMap<K, V>, key: K): SortedMap<K, V> {
  concreteSortedMap(self)
  return new SortedMapInternal(self.tree.removeFirst(key))
}

/**
 * @tsplus static SortedMap.Aspects remove
 */
export const remove = Pipeable(remove_)
