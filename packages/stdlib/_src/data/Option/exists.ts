/**
 * Returns `true` if the predicate is satisfied by the wrapped value.
 *
 * @tsplus fluent Option exists
 */
export function exists_<A>(ma: Option<A>, predicate: Predicate<A>): boolean {
  return ma.isNone() ? false : predicate(ma.value)
}

/**
 * @tsplus static Option/Aspects exists
 */
export const exists = Pipeable(exists_)
