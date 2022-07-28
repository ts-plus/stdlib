/**
 * Combines this computation with the specified computation combining the
 * results of both using the specified function.
 *
 * @tsplus static Eval.Aspects zipWith
 * @tsplus pipeable Eval zipWith
 */
export function zipWith<A, B, C>(that: LazyArg<Eval<B>>, f: (a: A, b: B) => C) {
  return (self: Eval<A>): Eval<C> => self.flatMap((a) => that().map((b) => f(a, b)))
}
