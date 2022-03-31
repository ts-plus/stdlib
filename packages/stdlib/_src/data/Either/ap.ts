/**
 * Classic Applicative.
 *
 * @tsplus fluent Either ap
 */
export function ap_<E, A, B, E2>(
  self: Either<E, (a: A) => B>,
  that: Either<E2, A>
): Either<E | E2, B> {
  return self.isLeft() ? self : that.isLeft() ? that : Either.right(self.right(that.right));
}

/**
 * Classic Applicative.
 *
 * @tsplus static Either/Aspects ap
 */
export const ap = Pipeable(ap_);
