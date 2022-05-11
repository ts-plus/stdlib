/**
 * Extends calls f with all the progressive slices up to the current element's
 * index, and uses the return value to construct the result array (i.e: like
 * `map` that also consumes all the elements up to `i`).
 *
 * @tsplus fluent ImmutableArray extend
 */
export function extend_<A, B>(self: ImmutableArray<A>, f: (fa: ImmutableArray<A>) => B): ImmutableArray<B> {
  return ImmutableArray.from(self.array.map((_, i, as) => f(ImmutableArray.from(as.slice(i)))));
}

/**
 * Extends calls f with all the progressive slices up to the current element's
 * index, and uses the return value to construct the result array (i.e: like
 * `map` that also consumes all the elements up to `i`).
 *
 * @tsplus static ImmutableArray/Aspects extend
 */
export const extend = Pipeable(extend_);
