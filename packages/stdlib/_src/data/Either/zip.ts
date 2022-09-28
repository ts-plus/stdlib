/**
 * Zips `Either<E, A>` and `Either<E2, B>` into `Either<E | E2, Tuple<[A, B]>>`.
 *
 * @tsplus pipeable-operator Either +
 * @tsplus static Either.Aspects zip
 * @tsplus pipeable Either zip
 */
export function zip<E, A, E2, B>(that: Either<E2, B>) {
  return <E, A>(self: Either<E, A>): Either<E | E2, readonly [A, B]> =>
    self.flatMap(
      (a) => that.map((b) => [a, b])
    )
}
