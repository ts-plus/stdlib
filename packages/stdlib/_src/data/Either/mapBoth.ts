/**
 * Maps over both the `Left` and the `Right` values.
 *
 * @tsplus static Either.Aspects mapBoth
 * @tsplus pipeable Either mapBoth
 */
export function mapBoth<E, A, E1, B>(f: (e: E) => E1, g: (a: A) => B) {
  return (self: Either<E, A>): Either<E1, B> =>
    self.isLeft() ? Either.left(f(self.left)) : Either.right(g(self.right))
}
