/**
 * Returns `true` if and only if every element in the first set is an element
 * of the second set.
 *
 * **Note**: the hash and equal of the 2 sets must be the same.
 *
 * @tsplus fluent SortedSet isSubset
 */
export function isSubset_<A>(self: SortedSet<A>, that: SortedSet<A>): boolean {
  return self.forAll((a) => that.has(a))
}

/**
 * Returns `true` if and only if every element in the first set is an element
 * of the second set.
 *
 * **Note**: the hash and equal of the 2 sets must be the same.
 *
 * @tsplus static SortedSet/Aspects isSubset
 */
export const isSubset = Pipeable(isSubset_)
