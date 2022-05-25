import { concreteSortedSet } from "@tsplus/stdlib/collections/SortedSet/_internal/SortedSetInternal"

/**
 * @tsplus fluent SortedSet has
 */
export function has_<A>(self: SortedSet<A>, value: A): boolean {
  concreteSortedSet(self)
  return self.keyTree.has(value)
}

/**
 * @tsplus static SortedSet/Aspects has
 */
export const has = Pipeable(has_)
