/**
 * Takes two arrays and returns an array of corresponding pairs. If one input
 * array is short, excess elements of the longer array are discarded
 *
 * @tsplus fluent ImmutableArray zip
 */
export function zip_<A, B>(self: ImmutableArray<A>, that: ImmutableArray<B>): ImmutableArray<Tuple<[A, B]>> {
  return self.zipWith(that, (a, b) => Tuple(a, b))
}

/**
 * Takes two arrays and returns an array of corresponding pairs. If one input
 * array is short, excess elements of the longer array are discarded
 *
 * @tsplus static ImmutableArray/Aspects zip
 */
export const zip = Pipeable(zip_)
