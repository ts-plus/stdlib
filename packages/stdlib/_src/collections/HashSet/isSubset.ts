/**
 * Returns `true` if and only if every element in the this `HashSet` is an
 * element of the second set,
 *
 * **NOTE**: the hash and equal of both sets must be the same.
 *
 * @tsplus fluent HashSet isSubset
 */
export function isSubset_<A>(self: HashSet<A>, that: HashSet<A>): boolean {
  return self.every((a) => that.has(a));
}

/**
 * Returns `true` if and only if every element in the this `HashSet` is an
 * element of the second set,
 *
 * **NOTE**: the hash and equal of both sets must be the same.
 *
 * @tsplus static HashSet/Aspects isSubset
 */
export const isSubset = Pipeable(isSubset_);
