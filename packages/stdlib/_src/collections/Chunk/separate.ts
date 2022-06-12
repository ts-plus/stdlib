/**
 * Partitions the elements of this chunk into two chunks.
 *
 * @tsplus getter Chunk separate
 */
export function separate<B, C>(self: Chunk<Either<B, C>>): Tuple<[Chunk<B>, Chunk<C>]> {
  return self.partitionMap(identity)
}
