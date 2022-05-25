/**
 * Reduce a value `b` through an `Either`.
 *
 * @tsplus fluent Either reduce
 */
export function reduce_<E, A, B>(self: Either<E, A>, b: B, f: (b: B, a: A) => B): B {
  return self.isLeft() ? b : f(b, self.right)
}

/**
 * Reduce a value `b` through an `Either`.
 *
 * @tsplus static Either/Aspects reduce
 */
export const reduce = Pipeable(reduce_)
