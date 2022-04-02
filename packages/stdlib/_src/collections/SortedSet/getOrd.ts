import { concreteSortedSet } from "@tsplus/stdlib/collections/SortedSet/_internal/SortedSetInternal";

/**
 * @tsplus fluent SortedSet getOrd
 */
export function getOrd<A>(self: SortedSet<A>): Ord<A> {
  concreteSortedSet(self);
  return self.keyTree.ord;
}
