/**
 * Executes the specified `Either` if it is a `Right`, otherwise executes
 * `orElse`.
 *
 * @tsplus operator Either |
 * @tsplus fluent Either orElse
 */
export function orElse_<E, A, E2, B>(
  self: Either<E, A>,
  onLeft: LazyArg<Either<E2, B>>
): Either<E2, A | B> {
  return self.catchAll(onLeft);
}

/**
 * Executes the specified `Either` if it is a `Right`, otherwise executes
 * `orElse`.
 *
 * @tsplus static Either/Aspects orElse
 */
export const orElse = Pipeable(orElse_);
