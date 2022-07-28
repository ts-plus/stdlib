// import { concreteSortedSet } from "@tsplus/stdlib/collections/SortedSet/_internal/SortedSetInternal";

/**
 * Computes the set difference between the set and the specified collection.
 *
 * @tsplus static SortedSet.Aspects difference
 * @tsplus pipeable SortedSet difference
 */
export function difference<A, B extends A>(that: Collection<B>) {
  return (self: SortedSet<A>): SortedSet<A> => {
    let out = self
    for (const value of that) {
      out = out.remove(value)
    }
    return out
  }
}
