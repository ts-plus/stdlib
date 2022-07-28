/**
 * Returns a computation that effectfully "peeks" at the success of this one.
 *
 * @tsplus static Eval.Aspects tap
 * @tsplus pipeable Eval tap
 */
export function tap<A, X>(f: (a: A) => Eval<X>) {
  return (self: Eval<A>): Eval<A> => self.flatMap((a) => f(a).map(() => a))
}
