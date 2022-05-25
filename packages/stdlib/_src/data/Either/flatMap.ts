/**
 * Extends this computation with another computation that depends on the
 * result of this computation by running the first computation, using its
 * result to generate a second computation, and running that computation.
 *
 * @tsplus fluent Either flatMap
 */
export function flatMap_<E, A, B, E2>(
  fa: Either<E, A>,
  f: (a: A) => Either<E2, B>
): Either<E | E2, B> {
  return fa.isLeft() ? fa : f(fa.right)
}

/**
 * Extends this computation with another computation that depends on the
 * result of this computation by running the first computation, using its
 * result to generate a second computation, and running that computation.
 *
 * @tsplus static Either/Aspects flatMap
 */
export const flatMap = Pipeable(flatMap_)
