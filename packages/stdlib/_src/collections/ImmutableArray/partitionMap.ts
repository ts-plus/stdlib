/**
 * Separate elements based on a map function.
 *
 * @tsplus static ImmutableArray.Aspects partitionMap
 * @tsplus pipeable ImmutableArray partitionMap
 */
export function partitionMap<A, B, C>(f: (a: A) => Either<B, C>) {
  return (self: ImmutableArray<A>): Tuple<[ImmutableArray<B>, ImmutableArray<C>]> =>
    self.partitionMapWithIndex((_, a) => f(a))
}
