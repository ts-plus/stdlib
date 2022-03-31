/**
 * Combines this computation with the specified computation, returning the
 * value of that computation.
 *
 * @tsplus operator Eval >
 * @tsplus fluent Eval zipRight
 */
export function zipRight_<A, B>(self: Eval<A>, that: LazyArg<Eval<B>>): Eval<B> {
  return self.zipWith(that, (_, b) => b);
}

/**
 * Combines this computation with the specified computation, returning the
 * value of that computation.
 *
 * @tsplus static Eval/Aspects zipRight
 */
export const zipRight = Pipeable(zipRight_);
