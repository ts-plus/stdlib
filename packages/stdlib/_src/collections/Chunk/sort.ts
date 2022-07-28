/**
 * Sort the elements of an array in increasing order.
 *
 * @tsplus static Chunk.Aspects sort
 * @tsplus pipeable Chunk sort
 */
export function sort<A>(O: Ord<A>) {
  return (self: Chunk<A>): Chunk<A> => Chunk.from(Array.from(self).sort((x, y) => O.compare(x, y)))
}
