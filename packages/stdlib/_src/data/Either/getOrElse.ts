/**
 * Get `A` or in case self is left return `onLeft` result.
 *
 * @tsplus fluent Either getOrElse
 */
export function getOrElse_<E, A, B>(self: Either<E, B>, onLeft: (e: E) => A): A | B {
  return self.isLeft() ? onLeft(self.left) : self.right;
}

/**
 * Get `A` or in case self is left return `onLeft` result.
 *
 * @tsplus static Either/Aspects getOrElse
 */
export const getOrElse = Pipeable(getOrElse_);
