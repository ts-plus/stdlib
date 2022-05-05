/**
 * Reduce a value `B` through an `Either` in inverted order.
 *
 * @tsplus fluent Either reduceRight
 */
export function reduceRight_<E, A, B>(self: Either<E, A>, b: B, f: (a: A, b: B) => B): B {
  return self.isLeft() ? b : f(self.right, b);
}

/**
 * Reduce a value `B` through an `Either` in inverted order.
 *
 * @tsplus static Either/Aspects reduceRight
 */
export const reduceRight = Pipeable(reduceRight_);
