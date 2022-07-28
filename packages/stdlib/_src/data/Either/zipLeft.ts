/**
 * Apply both and return the value of the first `Either`.
 *
 * @tsplus pipeable-operator Either <
 * @tsplus static Either.Aspects zipLeft
 * @tsplus pipeable Either zipLeft
 */
export function zipLeft<E2, B>(that: Either<E2, B>) {
  return <E, A>(self: Either<E, A>): Either<E | E2, A> => self.map((a) => () => a).ap(that)
}
