/**
 * Apply both and return the value of the second `Either`.
 *
 * @tsplus pipeable-operator Either >
 * @tsplus static Either.Aspects zipRight
 * @tsplus pipeable Either zipRight
 */
export function zipRight<E2, B>(that: Either<E2, B>) {
  return <E, A>(self: Either<E, A>): Either<E | E2, B> => self.map(() => (b: B) => b).ap(that)
}
