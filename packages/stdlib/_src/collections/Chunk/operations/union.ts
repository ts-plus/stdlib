/**
 * Creates an array of unique values, in order, from all given arrays using an
 * `Equivalence<A>` for equality comparisons.
 *
 * @tsplus static Chunk.Aspects union
 * @tsplus pipeable Chunk union
 */
export function union<A>(E: Equivalence<A>, that: Chunk<A>) {
  return (self: Chunk<A>): Chunk<A> => self + that.filter((a) => !self.elem(E, a))
}
