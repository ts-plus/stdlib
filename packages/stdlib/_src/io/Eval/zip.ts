/**
 * Combines this computation with the specified computation combining the
 * results of both into a tuple.
 *
 * @tsplus static Eval.Aspects zip
 * @tsplus pipeable Eval zip
 */
export function zip<B>(that: Eval<B>) {
  return <A>(self: Eval<A>): Eval<readonly [A, B]> => self.zipWith(that, (a, b) => [a, b])
}
