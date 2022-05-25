/**
 * Apply both and return the value of the first `Either`.
 *
 * @tsplus operator Either <
 * @tsplus fluent Either zipLeft
 */
export function zipLeft_<E, A, E2, B>(
  self: Either<E, A>,
  that: Either<E2, B>
): Either<E | E2, A> {
  return self.map((a) => () => a).ap(that)
}

/**
 * Apply both and return the value of the first `Either`.
 *
 * @tsplus static Either/Aspects zipLeft
 */
export const zipLeft = Pipeable(zipLeft_)
