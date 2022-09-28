/**
 * @tsplus static Maybe.Aspects partitionMap
 * @tsplus pipeable Maybe partitionMap
 */
export function partitionMap<A, B, B1>(f: (a: A) => Either<B, B1>) {
  return (self: Maybe<A>): readonly [Maybe<B>, Maybe<B1>] => self.map(f).separate
}
