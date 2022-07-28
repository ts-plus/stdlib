/**
 * Gets an element from the tuple.
 *
 * @tsplus static Tuple.Aspects at
 * @tsplus pipeable Tuple at
 */
export function at<Ks extends unknown[], I extends keyof Ks>(i: I) {
  return (self: Tuple<Ks>): Ks[I] => self.get(i)
}
