/**
 * Reduce a value `b` through an `Either`.
 *
 * @tsplus static Either.Aspects reduce
 * @tsplus pipeable Either reduce
 */
export function reduce<A, B>(b: B, f: (b: B, a: A) => B) {
  return <E>(self: Either<E, A>): B => self.isLeft() ? b : f(b, self.right)
}
