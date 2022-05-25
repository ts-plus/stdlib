/**
 * Maps over both the `Left` and the `Right` values.
 *
 * @tsplus fluent Either mapBoth
 */
export function mapBoth_<E, A, E1, B>(
  self: Either<E, A>,
  f: (e: E) => E1,
  g: (a: A) => B
): Either<E1, B> {
  return self.isLeft() ? Either.left(f(self.left)) : Either.right(g(self.right))
}

/**
 * Maps over both the `Left` and the `Right` values.
 *
 * @tsplus static Either/Aspects mapBoth
 */
export const mapBoth = Pipeable(mapBoth_)
