/**
 * Combines this computation with the specified computation combining the
 * results of both using the specified function.
 *
 * @tsplus fluent Eval zipWith
 */
export function zipWith_<A, B, C>(
  self: Eval<A>,
  that: LazyArg<Eval<B>>,
  f: (a: A, b: B) => C
) {
  return self.flatMap((a) => that().map((b) => f(a, b)));
}

/**
 * Combines this computation with the specified computation combining the
 * results of both using the specified function.
 *
 * @tsplus static Eval/Aspects zipWith
 */
export const zipWith = Pipeable(zipWith_);
