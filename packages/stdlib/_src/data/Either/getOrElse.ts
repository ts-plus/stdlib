/**
 * Get `A` or in case self is left return `onLeft` result.
 *
 * @tsplus static Either.Aspects getOrElse
 * @tsplus pipeable Either getOrElse
 */
export function getOrElse<E, A>(onLeft: (e: E) => A) {
  return <B>(self: Either<E, B>): A | B => self.isLeft() ? onLeft(self.left) : self.right
}
