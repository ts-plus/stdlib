import { concreteSortedSet } from "@tsplus/stdlib/collections/SortedSet/_internal/SortedSetInternal";

/**
 * @tsplus fluent SortedSet values
 */
export function values<A>(self: SortedSet<A>): IterableIterator<A> {
  concreteSortedSet(self);
  return self.keyTree.keys();
}
