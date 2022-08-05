/**
 * Returns `true` only if all values in the `HashSet` match the specified
 * predicate.
 *
 * @tsplus static HashSet.Aspects every
 * @tsplus pipeable HashSet every
 */
export function every<A>(f: Predicate<A>) {
  return (self: HashSet<A>): boolean => !self.some((a) => !f(a))
}
