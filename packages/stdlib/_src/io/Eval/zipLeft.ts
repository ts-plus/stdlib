/**
 * Combines this computation with the specified computation, returning the
 * value of this computation.
 *
 * @tsplus pipeable-operator Eval <
 * @tsplus static Eval.Aspects zipLeft
 * @tsplus pipeable Eval zipLeft
 */
export function zipLeft<B>(that: LazyArg<Eval<B>>) {
  return <A>(self: Eval<A>): Eval<A> => self.zipWith(that, (a, _) => a)
}
