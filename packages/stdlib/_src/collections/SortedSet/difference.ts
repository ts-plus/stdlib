// import { concreteSortedSet } from "@tsplus/stdlib/collections/SortedSet/_internal/SortedSetInternal";

/**
 * Computes the set difference between the set and the specified collection.
 *
 * @tsplus fluent SortedSet difference
 */
export function difference_<A, B extends A>(self: SortedSet<A>, that: Collection<B>): SortedSet<A> {
  let out = self;
  for (const value of that) {
    out = out.remove(value);
  }
  return out;
}

/**
 * Computes the set difference between the set and the specified collection.
 *
 * @tsplus static SortedSet/Aspects difference
 */
export const difference = Pipeable(difference_);
