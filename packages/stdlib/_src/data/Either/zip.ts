/**
 * Zips `Either<E, A>` and `Either<E2, B>` into `Either<E | E2, Tuple<[A, B]>>`.
 *
 * @tsplus operator Either +
 * @tsplus fluent Either zip
 */
export function zip_<E, A, E2, B>(
  self: Either<E, A>,
  that: Either<E2, B>
): Either<E | E2, Tuple<[A, B]>> {
  return self.flatMap((a) => that.map((b) => Tuple(a, b)));
}

/**
 * Zips `Either<E, A>` and `Either<E2, B>` into `Either<E | E2, Tuple<[A, B]>>`.
 *
 * @tsplus static Either/Aspects zip
 */
export const zip = Pipeable(zip_);
