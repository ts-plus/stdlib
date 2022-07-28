import { concreteSortedSet } from "@tsplus/stdlib/collections/SortedSet/_internal/SortedSetInternal"

/**
 * @tsplus static SortedSet.Aspects forEach
 * @tsplus pipeable SortedSet forEach
 */
export function forEach<A>(f: (a: A) => void) {
  return (self: SortedSet<A>): void => {
    concreteSortedSet(self)
    return self.keyTree.forEach((k) => f(k))
  }
}
