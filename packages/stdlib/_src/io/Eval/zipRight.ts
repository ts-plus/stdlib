/**
 * Combines this computation with the specified computation, returning the
 * value of that computation.
 *
 * @tsplus pipeable-operator Eval >
 * @tsplus static Eval.Aspects zipRight
 * @tsplus pipeable Eval zipRight
 */
export function zipRight<B>(that: Eval<B>) {
  return <A>(self: Eval<A>): Eval<B> => self.zipWith(that, (_, b) => b)
}
