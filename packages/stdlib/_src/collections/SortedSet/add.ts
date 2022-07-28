import { concreteSortedSet, SortedSetInternal } from "@tsplus/stdlib/collections/SortedSet/_internal/SortedSetInternal"

/**
 * @tsplus pipeable-operator SortedSet +
 * @tsplus static SortedSet.Aspects add
 * @tsplus pipeable SortedSet add
 */
export function add<A>(value: A) {
  return (self: SortedSet<A>): SortedSet<A> => {
    concreteSortedSet(self)
    return self.keyTree.has(value) ? self : new SortedSetInternal(self.keyTree.insert(value, true))
  }
}
