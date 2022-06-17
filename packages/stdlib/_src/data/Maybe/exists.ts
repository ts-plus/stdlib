/**
 * Returns `true` if the predicate is satisfied by the wrapped value.
 *
 * @tsplus fluent Maybe exists
 */
export function exists_<A>(ma: Maybe<A>, predicate: Predicate<A>): boolean {
  return ma.isNone() ? false : predicate(ma.value)
}

/**
 * @tsplus static Maybe/Aspects exists
 */
export const exists = Pipeable(exists_)
