import { SortedSetInternal } from "@tsplus/stdlib/collections/SortedSet/_internal/SortedSetInternal";

/**
 * @tsplus static SortedSet/Ops make
 */
export function make<A>(ord: Ord<A>): SortedSet<A> {
  return new SortedSetInternal(RedBlackTree.make(ord));
}
