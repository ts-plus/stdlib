/**
 * @tsplus fluent Maybe partitionMap
 */
export function partitionMap_<A, B, B1>(self: Maybe<A>, f: (a: A) => Either<B, B1>): Tuple<[Maybe<B>, Maybe<B1>]> {
  return self.map(f).separate
}

/**
 * @tsplus static Maybe/Aspects partitionMap
 */
export const partitionMap = Pipeable(partitionMap_)
