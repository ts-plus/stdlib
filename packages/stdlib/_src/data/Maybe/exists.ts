/**
 * Returns `true` if the predicate is satisfied by the wrapped value.
 *
 * @tsplus static Maybe.Aspects exists
 * @tsplus pipeable Maybe exists
 */
export function exists<A>(predicate: Predicate<A>) {
  return (self: Maybe<A>): boolean => self.isNone() ? false : predicate(self.value)
}
