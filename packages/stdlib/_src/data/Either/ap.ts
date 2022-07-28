/**
 * Classic Applicative.
 *
 * @tsplus static Either.Aspects ap
 * @tsplus pipeable Either ap
 */
export function ap<E2, A>(that: Either<E2, A>) {
  return <E, B>(self: Either<E, (a: A) => B>): Either<E | E2, B> =>
    self.isLeft() ? self : that.isLeft() ? that : Either.right(self.right(that.right))
}
