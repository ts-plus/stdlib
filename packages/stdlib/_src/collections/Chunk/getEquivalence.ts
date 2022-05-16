/**
 * @tsplus static Chunk/Ops getEquivalence
 */
export function getEquivalence<A>(E: Equivalence<A>): Equivalence<Chunk<A>> {
  return Equivalence((x, y) => x === y || x.corresponds(y, E.equals));
}
