/**
 * Use `A => B` to transform `Either<E, A>` to `Either<E, B>`.
 *
 * @tsplus static Either.Aspects map
 * @tsplus pipeable Either map
 */
export function map<A, B>(f: (a: A) => B) {
  return <E>(self: Either<E, A>): Either<E, B> => self.isLeft() ? self : Either.right(f(self.right))
}
