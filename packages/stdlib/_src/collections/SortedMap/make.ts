import { SortedMapInternal } from "@tsplus/stdlib/collections/SortedMap/_internal/SortedMapInternal"

/**
 * @tsplus static SortedMap/Ops make
 */
export function make<K, V>(ord: Ord<K>): SortedMap<K, V> {
  return new SortedMapInternal<K, V>(RedBlackTree.make(ord))
}
