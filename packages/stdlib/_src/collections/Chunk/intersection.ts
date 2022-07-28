/**
 * Creates an array of unique values that are included in all given arrays using
 * an `Equivalence<A>` for equality comparisons. The order and references of
 * result values are determined by the first array.
 *
 * @tsplus static Chunk.Aspects intersection
 * @tsplus pipeable Chunk intersection
 */
export function intersection<A>(E: Equivalence<A>, that: Chunk<A>) {
  return (self: Chunk<A>): Chunk<A> => self.filter((a) => that.elem(E, a))
}
