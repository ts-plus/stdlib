import { concreteSortedSet } from "@tsplus/stdlib/collections/SortedSet/_internal/SortedSetInternal"

/**
 * Partition the values of a set using the specified predicate.
 *
 * @tsplus static SortedSet.Aspects partition
 * @tsplus pipeable SortedSet partition
 */
export function partition<A, B extends A>(
  f: Refinement<A, B>
): (self: SortedSet<A>) => readonly [SortedSet<A>, SortedSet<B>]
export function partition<A>(
  f: Predicate<A>
): (self: SortedSet<A>) => readonly [SortedSet<A>, SortedSet<A>]
export function partition<A>(
  f: Predicate<A>
): (self: SortedSet<A>) => readonly [SortedSet<A>, SortedSet<A>] {
  return (self) => {
    concreteSortedSet(self)
    let right = SortedSet.empty(self.keyTree.ord)
    let left = SortedSet.empty(self.keyTree.ord)
    for (const value of self) {
      if (f(value)) {
        right = right.add(value)
      } else {
        left = left.add(value)
      }
    }
    return [left, right]
  }
}
