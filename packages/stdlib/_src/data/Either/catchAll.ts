/**
 * Executes the specified `Either` if it is a `Right`, otherwise executes
 * `onLeft`.
 *
 * @tsplus fluent Either catchAll
 */
export function catchAll_<E, A, E1, B>(
  self: Either<E, A>,
  onLeft: (e: E) => Either<E1, B>
): Either<E1, A | B> {
  return self.isLeft() ? onLeft(self.left) : self;
}

/**
 * Executes the specified `Either` if it is a `Right`, otherwise executes
 * `onLeft`.
 *
 * @tsplus static Either/Aspects catchAll
 */
export const catchAll = Pipeable(catchAll_);
