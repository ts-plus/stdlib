import { concreteSortedSet } from "@tsplus/stdlib/collections/SortedSet/_internal/SortedSetInternal"

/**
 * The set of elements which are in both the first and second set.
 *
 * **Note**: the hash and equal of the 2 sets must be the same.
 *
 * @tsplus static SortedSet.Aspects intersection
 * @tsplus pipeable SortedSet intersection
 */
export function intersection<A>(that: Iterable<A>) {
  return (self: SortedSet<A>): SortedSet<A> => {
    concreteSortedSet(self)

    let out = SortedSet.empty<A>(self.keyTree.ord)

    for (const key of that) {
      if (self.has(key)) {
        out = out.add(key)
      }
    }

    return out
  }
}
