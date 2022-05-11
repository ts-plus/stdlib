/**
 * @tsplus fluent NonEmptyImmutableArray flatMap
 */
export function flatMap_<A, B>(
  self: NonEmptyImmutableArray<A>,
  f: (a: A) => NonEmptyImmutableArray<B>
): NonEmptyImmutableArray<B> {
  return new ImmutableArray(self.array.flatMap(x => f(x).array) as any) as NonEmptyImmutableArray<B>;
}

/**
 * @tsplus static NonEmptyImmutableArray/Aspects flatMap
 */
export const flatMap = Pipeable(flatMap_);
