/**
 * Converst an `Either<E, A>` into an `Either<A, E>`.
 *
 * @tsplus fluent Either swap
 */
export function swap<E, A>(self: Either<E, A>): Either<A, E> {
  return self.isLeft() ? Either.right(self.left) : Either.left(self.right)
}
