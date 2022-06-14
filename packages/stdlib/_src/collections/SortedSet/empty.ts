import { SortedSetInternal } from "@tsplus/stdlib/collections/SortedSet/_internal/SortedSetInternal"

/**
 * @tsplus static SortedSet/Ops empty
 */
export function empty<A>(ord: Ord<A>): SortedSet<A> {
  return new SortedSetInternal<A>(RedBlackTree.empty<A, boolean>(ord))
}
