/**
 * Separate elements based on a predicate.
 *
 * @tsplus fluent Chunk partition
 */
export function partition_<A>(self: Chunk<A>, f: Predicate<A>): Tuple<[Chunk<A>, Chunk<A>]> {
  return self.partitionWithIndex((_, a: A) => f(a))
}

/**
 * Separate elements based on a predicate.
 *
 * @tsplus static Chunk/Aspects partition
 */
export const partition = Pipeable(partition_)
