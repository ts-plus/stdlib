/**
 * Get an `Associative` instance for `Either` that combines both success and failure
 * given `Associative` of `A` & `E`.
 *
 * @tsplus static Either.Ops getValidationAssociative
 */
export function getValidationAssociative<E, A>(
  SE: Associative<E>,
  SA: Associative<A>
): Associative<Either<E, A>> {
  return Associative((fx, fy) =>
    fx.isLeft()
      ? fy.isLeft()
        ? Either.left(SE.combine(fx.left, fy.left))
        : fx
      : fy.isLeft()
      ? fy
      : Either.right(SA.combine(fx.right, fy.right))
  )
}
