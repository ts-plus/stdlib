/**
 * Apply both and return the value of the second `Either`.
 *
 * @tsplus operator Either >
 * @tsplus fluent Either zipRight
 */
export function zipRight_<E, A, E2, B>(
  self: Either<E, A>,
  that: Either<E2, B>
): Either<E | E2, B> {
  return self.map(() => (b: B) => b).ap(that)
}

/**
 * Apply both and return the value of the second `Either`.
 *
 * @tsplus static Either/Aspects zipRight
 */
export const zipRight = Pipeable(zipRight_)
