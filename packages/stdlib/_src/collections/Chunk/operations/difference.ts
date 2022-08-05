/**
 * Creates an array of array values not included in the other given array using
 * an `Equivalence<A>` for equality comparisons. The order and references of
 * result values are determined by the first array.
 *
 * @tsplus static Chunk.Aspects difference
 * @tsplus pipeable Chunk difference
 */
export function difference<A>(
  E: Equivalence<A>,
  that: Chunk<A>
) {
  return (self: Chunk<A>): Chunk<A> => self.filter((a) => !that.elem(E, a))
}
