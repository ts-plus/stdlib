/**
 * Use `E => E1` to transform `Either<E, A>` to `Either<E1, A>`
 *
 * @tsplus fluent Either mapLeft
 */
export function mapLeft_<E, A, E1>(self: Either<E, A>, f: (e: E) => E1): Either<E1, A> {
  return self.isLeft() ? Either.left(f(self.left)) : self
}

/**
 * Use `E => E1` to transform `Either[E, A]` to `Either[E1, A]`
 *
 * @tsplus static Either/Aspects mapLeft
 */
export const mapLeft = Pipeable(mapLeft_)
