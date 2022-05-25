/**
 * @tsplus static ImmutableArray/Ops getAssociative
 */
export function getAssociative<A>(): Associative<ImmutableArray<A>> {
  return Associative((x, y) => x.concat(y))
}
