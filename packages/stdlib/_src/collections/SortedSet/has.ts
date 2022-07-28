import { concreteSortedSet } from "@tsplus/stdlib/collections/SortedSet/_internal/SortedSetInternal"

/**
 * @tsplus static SortedSet.Aspects has
 * @tsplus pipeable SortedSet has
 */
export function has<A>(value: A) {
  return (self: SortedSet<A>): boolean => {
    concreteSortedSet(self)
    return self.keyTree.has(value)
  }
}
