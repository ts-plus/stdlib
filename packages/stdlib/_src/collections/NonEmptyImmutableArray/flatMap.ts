/**
 * @tsplus fluent NonEmptyImmutableArray flatMap
 */
export function flatMap_<A, B>(self: NonEmptyImmutableArray<A>, f: (a: A) => NonEmptyImmutableArray<B>) {
  return new NonEmptyImmutableArray(self.array.flatMap(x => f(x).array) as any);
}

/**
 * @tsplus static NonEmptyImmutableArray/Aspects flatMap
 */
export const flatMap = Pipeable(flatMap_);
