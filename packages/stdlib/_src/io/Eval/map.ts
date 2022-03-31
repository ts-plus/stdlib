/**
 * Extends this computation with another computation that depends on the
 * result of this computation by running the first computation, using its
 * result to generate a second computation, and running that computation.
 *
 * @tsplus fluent Eval map
 */
export function map_<A, B>(self: Eval<A>, f: (a: A) => B) {
  return self.flatMap((a) => Eval.succeed(f(a)));
}

/**
 * Extends this computation with another computation that depends on the
 * result of this computation by running the first computation, using its
 * result to generate a second computation, and running that computation.
 *
 * @tsplus static Eval/Aspects map
 */
export const map = Pipeable(map_);
