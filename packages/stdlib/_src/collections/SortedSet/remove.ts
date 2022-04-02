import { concreteSortedSet, SortedSetInternal } from "@tsplus/stdlib/collections/SortedSet/_internal/SortedSetInternal";

/**
 * @tsplus operator SortedSet -
 * @tsplus fluent SortedSet remove
 */
export function remove_<A>(self: SortedSet<A>, value: A): SortedSet<A> {
  concreteSortedSet(self);
  return new SortedSetInternal(self.keyTree.removeFirst(value));
}

/**
 * @tsplus static SortedSet/Aspects remove
 */
export const remove = Pipeable(remove_);
