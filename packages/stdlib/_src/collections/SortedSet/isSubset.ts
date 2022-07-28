/**
 * Returns `true` if and only if every element in the first set is an element
 * of the second set.
 *
 * **Note**: the hash and equal of the 2 sets must be the same.
 *
 * @tsplus static SortedSet.Aspects isSubset
 * @tsplus pipeable SortedSet isSubset
 */
export function isSubset<A>(that: SortedSet<A>) {
  return (self: SortedSet<A>): boolean => self.forAll((a) => that.has(a))
}
