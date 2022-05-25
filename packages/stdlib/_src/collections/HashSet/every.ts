/**
 * Returns `true` only if all values in the `HashSet` match the specified
 * predicate.
 *
 * @tsplus fluent HashSet every
 */
export function every_<A>(self: HashSet<A>, f: Predicate<A>): boolean {
  return !self.some((a) => !f(a))
}

/**
 * Returns `true` only if all values in the `HashSet` match the specified
 * predicate.
 *
 * @tsplus static HashSet/Aspects every
 */
export const every = Pipeable(every_)
