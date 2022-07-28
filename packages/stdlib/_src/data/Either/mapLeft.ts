/**
 * Use `E => E1` to transform `Either<E, A>` to `Either<E1, A>`
 *
 * @tsplus static Either.Aspects mapLeft
 * @tsplus pipeable Either mapLeft
 */
export function mapLeft<E, E1>(f: (e: E) => E1) {
  return <A>(self: Either<E, A>): Either<E1, A> => self.isLeft() ? Either.left(f(self.left)) : self
}
