/**
 * Separate elements based on a map function.
 *
 * @tsplus fluent ImmutableArray partitionMap
 */
export function partitionMap_<A, B, C>(
  self: ImmutableArray<A>,
  f: (a: A) => Either<B, C>
): Tuple<[ImmutableArray<B>, ImmutableArray<C>]> {
  return self.partitionMapWithIndex((_, a) => f(a))
}

/**
 * Separate elements based on a map function.
 *
 * @tsplus static ImmutableArray/Aspects partitionMap
 */
export const partitionMap = Pipeable(partitionMap_)
