/**
 * @tsplus static Tree.Ops getEquivalence
 */
export function getEquivalence<A>(E: Equivalence<A>): Equivalence<Tree<A>> {
  // eslint-disable-next-line prefer-const
  let chunkEq: Equivalence<Chunk<Tree<A>>>
  const R: Equivalence<Tree<A>> = Equivalence(
    (x, y) => E.equals(x.value, y.value) && chunkEq.equals(x.forest, y.forest)
  )
  chunkEq = Chunk.getEquivalence(R)
  return R
}
