/**
 * Extends calls f with all the progressive slices up to the current element's
 * index, and uses the return value to construct the result array (i.e: like
 * `map` that also consumes all the elements up to `i`).
 *
 * @tsplus static ImmutableArray.Aspects extend
 * @tsplus pipeable ImmutableArray extend
 */
export function extend<A, B>(f: (fa: ImmutableArray<A>) => B) {
  return (self: ImmutableArray<A>): ImmutableArray<B> =>
    ImmutableArray.from(self.array.map((_, i, as) => f(ImmutableArray.from(as.slice(i)))))
}
