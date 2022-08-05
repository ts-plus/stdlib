/**
 * Returns `true` if and only if every element in the this `HashSet` is an
 * element of the second set,
 *
 * **NOTE**: the hash and equal of both sets must be the same.
 *
 * @tsplus static HashSet.Aspects isSubset
 * @tsplus pipeable HashSet isSubset
 */
export function isSubset<A>(that: HashSet<A>) {
  return (self: HashSet<A>): boolean => self.every((a) => that.has(a))
}
