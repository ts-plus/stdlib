/**
 * Separate elements based on a predicate.
 *
 * @tsplus static ImmutableArray.Aspects partition
 * @tsplus pipeable ImmutableArray partition
 */
export function partition<A>(f: Predicate<A>) {
  return (self: ImmutableArray<A>): readonly [ImmutableArray<A>, ImmutableArray<A>] =>
    self.partitionWithIndex((_, a) => f(a))
}
