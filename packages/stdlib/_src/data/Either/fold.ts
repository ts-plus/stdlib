/**
 * Takes two functions and an `Either` value, if the value is a `Left` the
 * inner value is applied to the first function, if the value is a `Right` the
 * inner value is applied to the second function.
 *
 * @tsplus static Either.Aspects fold
 * @tsplus pipeable Either fold
 */
export function fold<E, A, B, C>(onLeft: (e: E) => B, onRight: (a: A) => C) {
  return (self: Either<E, A>): B | C => self.isLeft() ? onLeft(self.left) : onRight(self.right)
}
