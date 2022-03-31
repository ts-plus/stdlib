/**
 * Takes two functions and an `Either` value, if the value is a `Left` the
 * inner value is applied to the first function, if the value is a `Right` the
 * inner value is applied to the second function.
 *
 * @tsplus fluent Either fold
 */
export function fold_<E, A, B, C>(
  self: Either<E, A>,
  onLeft: (e: E) => B,
  onRight: (a: A) => C
): B | C {
  return self.isLeft() ? onLeft(self.left) : onRight(self.right);
}

/**
 * Takes two functions and an `Either` value, if the value is a `Left` the
 * inner value is applied to the first function, if the value is a `Right` the
 * inner value is applied to the second function.
 *
 * @tsplus static Either/Aspects fold
 */
export const fold = Pipeable(fold_);
