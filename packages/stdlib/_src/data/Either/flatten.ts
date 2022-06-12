/**
 * Flatten nested `Either<E, Either<E1, A>>` into `Either<E | E1, A>`.
 *
 * @tsplus getter Either flatten
 */
export function flatten<E, E2, A>(self: Either<E, Either<E2, A>>): Either<E | E2, A> {
  return self.flatMap(identity)
}
