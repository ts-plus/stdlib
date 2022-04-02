import { concreteSortedSet } from "@tsplus/stdlib/collections/SortedSet/_internal/SortedSetInternal";

/**
 * Computes the set union of the set and the specified collection
 *
 * **Note**: the hash and equal of the 2 sets must be the same.
 *
 * @tsplus fluent SortedSet union
 */
export function union_<A>(self: SortedSet<A>, that: Collection<A>): SortedSet<A> {
  concreteSortedSet(self);
  let out = SortedSet.make(self.keyTree.ord);
  for (const value of self) {
    out = out.add(value);
  }
  for (const value of that) {
    out = out.add(value);
  }
  return out;
}

/**
 * Form the union of two sets,
 *
 * the hash and equal of the 2 sets has to be the same
 *
 * @tsplus static SortedSet/Aspects union
 */
export const union = Pipeable(union_);
