/**
 * Separate elements based on a predicate.
 *
 * @tsplus fluent ImmutableArray partition
 */
export function partition_<A>(self: ImmutableArray<A>, f: Predicate<A>): Tuple<[ImmutableArray<A>, ImmutableArray<A>]> {
  return self.partitionWithIndex((_, a) => f(a));
}

/**
 * Separate elements based on a predicate.
 *
 * @tsplus static ImmutableArray/Aspects partition
 */
export const partition = Pipeable(partition_);
