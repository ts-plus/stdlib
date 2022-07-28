/**
 * @tsplus static NonEmptyImmutableArray.Ops getAssociative
 */
export function getAssociative<A>(): Associative<NonEmptyImmutableArray<A>> {
  return Associative((x, y) => x + y)
}
