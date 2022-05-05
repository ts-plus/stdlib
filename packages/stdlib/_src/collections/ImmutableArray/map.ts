/**
 * @tsplus fluent ImmutableArray map
 */
export function map_<A, B>(
  i: ImmutableArray<A>,
  f: (a: A, k: number) => B
): ImmutableArray<B> {
  return new ImmutableArray(i.array.map(f));
}

/**
 * @tsplus static ImmutableArray/Aspects map
 */
export const map = Pipeable(map_);
