import { SortedMapInternal } from "@tsplus/stdlib/collections/SortedMap/_internal/SortedMapInternal"

/**
 * @tsplus static SortedMap/Ops __call
 */
export function from_<K, V>(
  ord: Ord<K>,
  iterable: Iterable<Tuple<[K, V]>>
): SortedMap<K, V> {
  return new SortedMapInternal(RedBlackTree(iterable, ord))
}

/**
 * @tsplus static SortedMap/Aspects from
 */
export const from = Pipeable(from_)
