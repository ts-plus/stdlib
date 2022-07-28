import { SortedSetInternal } from "@tsplus/stdlib/collections/SortedSet/_internal/SortedSetInternal"
import { Tuple } from "@tsplus/stdlib/data/Tuple"

/**
 * @tsplus static SortedSet.Ops from
 */
export function from_<A>(
  ord: Ord<A>
): (
  iterable: Collection<A>
) => SortedSet<A> {
  return (
    iterable: Collection<A>
  ) => new SortedSetInternal(RedBlackTree.from(ord)(iterable.map((_) => Tuple(_, true))))
}

/**
 * @tsplus static SortedSet.Aspects from
 */
export const from = Pipeable(from_)
