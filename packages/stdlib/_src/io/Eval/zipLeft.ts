/**
 * Combines this computation with the specified computation, returning the
 * value of this computation.
 *
 * @tsplus operator Eval <
 * @tsplus fluent Eval zipLeft
 */
export function zipLeft_<A, B>(self: Eval<A>, that: LazyArg<Eval<B>>): Eval<A> {
  return self.zipWith(that, (a, _) => a);
}

/**
 * Combines this computation with the specified computation, returning the
 * value of this computation.
 *
 * @tsplus static Eval/Aspects zipLeft
 */
export const zipLeft = Pipeable(zipLeft_);
