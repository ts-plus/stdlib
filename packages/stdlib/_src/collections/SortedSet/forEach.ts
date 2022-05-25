import { concreteSortedSet } from "@tsplus/stdlib/collections/SortedSet/_internal/SortedSetInternal"

/**
 * @tsplus fluent SortedSet forEach
 */
export function forEach_<A>(self: SortedSet<A>, f: (a: A) => void): void {
  concreteSortedSet(self)
  return self.keyTree.forEach((k) => f(k))
}

/**
 * @tsplus static SortedSet/Aspects forEach
 */
export const forEach = Pipeable(forEach_)
