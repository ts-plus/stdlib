/**
 * Self embed `Either<E, A>` into `Either<E, Either<E, A>>`.
 *
 * @tsplus getter Either duplicate
 */
export function duplicate<E, A>(self: Either<E, A>): Either<E, Either<E, A>> {
  return self.extend(identity)
}
