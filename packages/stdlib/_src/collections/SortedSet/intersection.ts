import { concreteSortedSet } from "@tsplus/stdlib/collections/SortedSet/_internal/SortedSetInternal"

/**
 * The set of elements which are in both the first and second set.
 *
 * **Note**: the hash and equal of the 2 sets must be the same.
 *
 * @tsplus fluent SortedSet intersection
 */
export function intersection_<A>(self: SortedSet<A>, that: Iterable<A>): SortedSet<A> {
  concreteSortedSet(self)

  let out = SortedSet.make<A>(self.keyTree.ord)

  for (const key of that) {
    if (self.has(key)) {
      out = out.add(key)
    }
  }

  return out
}

/**
 * The set of elements which are in both the first and second set.
 *
 * **Note**: the hash and equal of the 2 sets must be the same.
 *
 * @tsplus static SortedSet/Aspects intersection
 */
export const intersection = Pipeable(intersection_)
