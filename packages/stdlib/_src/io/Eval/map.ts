/**
 * Extends this computation with another computation that depends on the
 * result of this computation by running the first computation, using its
 * result to generate a second computation, and running that computation.
 *
 * @tsplus static Eval.Aspects map
 * @tsplus pipeable Eval map
 */
export function map<A, B>(f: (a: A) => B) {
  return (self: Eval<A>): Eval<B> => self.flatMap((a) => Eval.succeed(f(a)))
}
