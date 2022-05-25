/**
 * Apply a function to pairs of elements at the same index in two arrays,
 * collecting the results in a new array. If one input array is short, excess
 * elements of the longer array are discarded.
 *
 * @tsplus fluent ImmutableArray zipWith
 */
export function zipWith_<A, B, C>(
  self: ImmutableArray<A>,
  that: ImmutableArray<B>,
  f: (a: A, b: B) => C
): ImmutableArray<C> {
  const fc: Array<C> = []
  const length = Math.min(self.array.length, that.array.length)
  for (let i = 0; i < length; i++) {
    fc[i] = f(self.array[i]!, that.array[i]!)
  }
  return ImmutableArray.from(fc)
}

/**
 * Apply a function to pairs of elements at the same index in two arrays,
 * collecting the results in a new array. If one input array is short, excess
 * elements of the longer array are discarded.
 *
 * @tsplus static ImmutableArray/Aspects zipWith
 */
export const zipWith = Pipeable(zipWith_)
