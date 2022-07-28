import { concreteSortedSet } from "@tsplus/stdlib/collections/SortedSet/_internal/SortedSetInternal"

/**
 * Filter the values of the set using the specified predicate.
 *
 * @tsplus static SortedSet.Aspects filter
 * @tsplus pipeable SortedSet filter
 */
export function filter<A, B extends A>(f: Refinement<A, B>): (self: SortedSet<A>) => SortedSet<B>
export function filter<A>(f: Predicate<A>): (self: SortedSet<A>) => SortedSet<A>
export function filter<A>(f: Predicate<A>): (self: SortedSet<A>) => SortedSet<A> {
  return (self) => {
    concreteSortedSet(self)
    let out = SortedSet.empty(self.keyTree.ord)
    for (const value of self) {
      if (f(value)) {
        out = out.add(value)
      }
    }
    return out
  }
}
