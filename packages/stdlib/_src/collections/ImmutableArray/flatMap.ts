/**
 * @tsplus fluent ImmutableArray flatMap
 */
export function flatMap_<A, B>(self: ImmutableArray<A>, f: (a: A) => ImmutableArray<B>) {
  return new ImmutableArray(self.array.flatMap(x => f(x).array));
}

/**
 * @tsplus static ImmutableArray/Aspects flatMap
 */
export const flatMap = Pipeable(flatMap_);
