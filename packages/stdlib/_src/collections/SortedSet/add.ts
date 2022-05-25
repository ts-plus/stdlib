import { concreteSortedSet, SortedSetInternal } from "@tsplus/stdlib/collections/SortedSet/_internal/SortedSetInternal"

/**
 * @tsplus operator SortedSet +
 * @tsplus fluent SortedSet add
 */
export function add_<A>(self: SortedSet<A>, value: A): SortedSet<A> {
  concreteSortedSet(self)
  return self.keyTree.has(value) ? self : new SortedSetInternal(self.keyTree.insert(value, true))
}

/**
 * @tsplus static SortedSet/Aspects add
 */
export const add = Pipeable(add_)
