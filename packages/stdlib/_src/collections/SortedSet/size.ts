import { concreteSortedSet } from "@tsplus/stdlib/collections/SortedSet/_internal/SortedSetInternal"

/**
 * Calculate the number of keys in the set.
 *
 * @tsplus getter SortedSet size
 */
export function size<A>(self: SortedSet<A>): number {
  concreteSortedSet(self)
  return self.keyTree.size
}
