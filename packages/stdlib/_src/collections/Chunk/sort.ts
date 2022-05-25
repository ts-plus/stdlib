/**
 * Sort the elements of an array in increasing order.
 *
 * @tsplus fluent Chunk sort
 */
export function sort_<A>(self: Chunk<A>, O: Ord<A>): Chunk<A> {
  return Chunk.from(Array.from(self).sort((x, y) => O.compare(x, y)))
}

/**
 * Sort the elements of an array in increasing order.
 *
 * @tsplus static Chunk/Aspects sort
 */
export const sort = Pipeable(sort_)
