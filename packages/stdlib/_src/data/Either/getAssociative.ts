/**
 * Get `Associative` for `Either` given `Associative` of `A`.
 *
 * @tsplus static Either/Ops getAssociative
 */
export function getAssociative<E, A>(S: Associative<A>): Associative<Either<E, A>> {
  return Associative((x, y) => y.isLeft() ? x : x.isLeft() ? y : Either.right(S.combine(x.right, y.right)));
}
