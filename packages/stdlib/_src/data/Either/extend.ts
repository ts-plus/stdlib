/**
 * Apply `Either<E, A> => B` in case self is right returning `Either<E, B>`.
 *
 * @tsplus fluent Either extend
 */
export function extend_<E, A, B>(
  self: Either<E, A>,
  f: (either: Either<E, A>) => B
): Either<E, B> {
  return self.isLeft() ? self : Either.right(f(self));
}

/**
 * Apply `Either<E, A> => B` in case self is right returning `Either<E, B>`.
 *
 * @tsplus static Either/Aspects extend
 */
export const extend = Pipeable(extend_);
