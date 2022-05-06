/**
 * @tsplus fluent Option partitionMap
 */
export function partitionMap_<A, B, B1>(self: Option<A>, f: (a: A) => Either<B, B1>): Tuple<[Option<B>, Option<B1>]> {
  return self.map(f).separate();
}

/**
 * @tsplus static Option/Aspects partitionMap
 */
export const partitionMap = Pipeable(partitionMap_);
