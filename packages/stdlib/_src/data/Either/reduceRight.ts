/**
 * Reduce a value `B` through an `Either` in inverted order.
 *
 * @tsplus static Either.Aspects reduceRight
 * @tsplus pipeable Either reduceRight
 */
export function reduceRight<A, B>(b: B, f: (a: A, b: B) => B) {
  return <E>(self: Either<E, A>): B => self.isLeft() ? b : f(self.right, b)
}
