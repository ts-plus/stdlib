/**
 * Partitions the elements of this chunk into two chunks using the specified
 * function.
 *
 * @tsplus fluent Chunk partitionMap
 */
export function partitionMap_<A, B, C>(
  self: Chunk<A>,
  f: (a: A) => Either<B, C>
): Tuple<[Chunk<B>, Chunk<C>]> {
  return self.partitionMapWithIndex((_, a) => f(a))
}

/**
 * Partitions the elements of this chunk into two chunks using the specified
 * function.
 *
 * @tsplus static Chunk/Aspects partitionMap
 */
export const partitionMap = Pipeable(partitionMap_)
