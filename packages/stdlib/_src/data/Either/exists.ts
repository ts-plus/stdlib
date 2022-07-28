/**
 * Returns `false` if `Left` or returns the result of the application of the
 * given predicate to the `Right` value.
 *
 * @tsplus static Either.Aspects exists
 * @tsplus pipeable Either exists
 */
export function exists<A>(f: Predicate<A>) {
  return <E>(self: Either<E, A>): boolean => self.isLeft() ? false : f(self.right)
}
