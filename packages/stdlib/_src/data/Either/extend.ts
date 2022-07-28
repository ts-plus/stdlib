/**
 * Apply `Either<E, A> => B` in case self is right returning `Either<E, B>`.
 *
 * @tsplus static Either.Aspects extend
 * @tsplus pipeable Either extend
 */
export function extend<E, A, B>(f: (either: Either<E, A>) => B) {
  return (self: Either<E, A>): Either<E, B> => self.isLeft() ? self : Either.right(f(self))
}
