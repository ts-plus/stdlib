/**
 * Partitions the elements of this chunk into two chunks using the specified
 * function.
 *
 * @tsplus static Chunk.Aspects partitionMap
 * @tsplus pipeable Chunk partitionMap
 */
export function partitionMap<A, B, C>(f: (a: A) => Either<B, C>) {
  return (self: Chunk<A>): readonly [Chunk<B>, Chunk<C>] =>
    self.partitionMapWithIndex((_, a) => f(a))
}
