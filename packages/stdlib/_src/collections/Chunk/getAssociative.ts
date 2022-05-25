/**
 * @tsplus static Chunk/Ops getAssociative
 */
export function getAssociative<A>(): Associative<Chunk<A>> {
  return Associative((x, y) => x.concat(y))
}
