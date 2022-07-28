/**
 * Extends this computation with another computation that depends on the
 * result of this computation by running the first computation, using its
 * result to generate a second computation, and running that computation.
 *
 * @tsplus static Either.Aspects flatMap
 * @tsplus pipeable Either flatMap
 */
export function flatMap<A, B, E2>(f: (a: A) => Either<E2, B>) {
  return <E>(self: Either<E, A>): Either<E | E2, B> => self.isLeft() ? self : f(self.right)
}
