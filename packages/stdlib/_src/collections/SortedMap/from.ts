import { SortedMapInternal } from "@tsplus/stdlib/collections/SortedMap/_internal/SortedMapInternal"

/**
 * @tsplus static SortedMap.Ops from
 */
export function from_<K>(
  ord: Ord<K>
): <V>(
  iterable: Collection<readonly [K, V]>
) => SortedMap<K, V> {
  return <V>(
    iterable: Collection<readonly [K, V]>
  ) => new SortedMapInternal(RedBlackTree.from<K, V>(ord)(iterable))
}

/**
 * @tsplus static SortedMap.Aspects from
 */
export const from = Pipeable(from_)
