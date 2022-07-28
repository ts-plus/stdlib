import { concreteSortedSet, SortedSetInternal } from "@tsplus/stdlib/collections/SortedSet/_internal/SortedSetInternal"

/**
 * @tsplus pipeable-operator SortedSet -
 * @tsplus static SortedSet.Aspects remove
 * @tsplus pipeable SortedSet remove
 */
export function remove<A>(value: A) {
  return (self: SortedSet<A>): SortedSet<A> => {
    concreteSortedSet(self)
    return new SortedSetInternal(self.keyTree.removeFirst(value))
  }
}
