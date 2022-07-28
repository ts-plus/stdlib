/**
 * Combines this computation with the specified computation combining the
 * results of both into a tuple.
 *
 * @tsplus static Eval.Aspects zip
 * @tsplus pipeable Eval zip
 */
export function zip<B>(that: LazyArg<Eval<B>>) {
  return <A>(self: Eval<A>): Eval<Tuple<[A, B]>> => self.zipWith(that, (a, b) => Tuple(a, b))
}
