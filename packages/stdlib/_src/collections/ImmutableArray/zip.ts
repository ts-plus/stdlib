/**
 * Takes two arrays and returns an array of corresponding pairs. If one input
 * array is short, excess elements of the longer array are discarded
 *
 * @tsplus static ImmutableArray.Aspects zip
 * @tsplus pipeable ImmutableArray zip
 */
export function zip<B>(that: ImmutableArray<B>) {
  return <A>(self: ImmutableArray<A>): ImmutableArray<Tuple<[A, B]>> =>
    self.zipWith(that, (a, b) => Tuple(a, b))
}
