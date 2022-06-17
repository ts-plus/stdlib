/**
 * Extracts the value out of the structure, if it exists. Otherwise returns the
 * given default value.
 *
 * @tsplus fluent Maybe getOrElse
 */
export function getOrElse_<A, B>(self: Maybe<A>, onNone: LazyArg<B>): A | B {
  return self.isNone() ? onNone() : self.value
}

/**
 * @tsplus static Maybe/Aspects getOrElse
 */
export const getOrElse = Pipeable(getOrElse_)
