/**
 * @tsplus fluent NonEmptyImmutableArray map
 */
export function map_<A, B>(self: NonEmptyImmutableArray<A>, f: (a: A, i: number) => B): NonEmptyImmutableArray<B> {
  return new ImmutableArray(self.array.map((a, i) => f(a, i)) as any) as NonEmptyImmutableArray<B>
}

/**
 * @tsplus static NonEmptyImmutableArray/Aspects map
 */
export const map = Pipeable(map_)
