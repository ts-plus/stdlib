/**
 * Executes the specified `Either` if it is a `Right`, otherwise executes
 * `onLeft`.
 *
 * @tsplus static Either.Aspects catchAll
 * @tsplus pipeable Either catchAll
 */
export function catchAll<E, E1, B>(onLeft: (e: E) => Either<E1, B>) {
  return <A>(self: Either<E, A>): Either<E1, A | B> => self.isLeft() ? onLeft(self.left) : self
}
