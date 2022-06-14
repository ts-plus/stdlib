import { SortedMapInternal } from "@tsplus/stdlib/collections/SortedMap/_internal/SortedMapInternal"

/**
 * @tsplus static SortedMap/Ops empty
 */
export function empty<K, V>(ord: Ord<K>): SortedMap<K, V> {
  return new SortedMapInternal<K, V>(RedBlackTree.empty<K, V>(ord))
}
