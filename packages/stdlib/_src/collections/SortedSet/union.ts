import { concreteSortedSet } from "@tsplus/stdlib/collections/SortedSet/_internal/SortedSetInternal"

/**
 * Computes the set union of the set and the specified collection
 *
 * **Note**: the hash and equal of the 2 sets must be the same.
 *
 * @tsplus static SortedSet.Aspects union
 * @tsplus pipeable SortedSet union
 */
export function union<A>(that: Collection<A>) {
  return (self: SortedSet<A>): SortedSet<A> => {
    concreteSortedSet(self)
    let out = SortedSet.empty(self.keyTree.ord)
    for (const value of self) {
      out = out.add(value)
    }
    for (const value of that) {
      out = out.add(value)
    }
    return out
  }
}
