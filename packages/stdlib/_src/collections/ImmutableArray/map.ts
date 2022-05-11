/**
 * @tsplus fluent ImmutableArray map
 */
export function map_<A, B>(self: ImmutableArray<A>, f: (a: A, k: number) => B): ImmutableArray<B> {
  return new ImmutableArray(self.array.map((a, i) => f(a, i)));
}

/**
 * @tsplus static ImmutableArray/Aspects map
 */
export const map = Pipeable(map_);
