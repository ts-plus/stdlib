/**
 * Combines this computation with the specified computation combining the
 * results of both into a tuple.
 *
 * @tsplus fluent Eval zip
 */
export function zip_<A, B>(self: Eval<A>, that: LazyArg<Eval<B>>): Eval<Tuple<[A, B]>> {
  return self.zipWith(that, (a, b) => Tuple(a, b));
}

/**
 * Combines this computation with the specified computation, combining the
 * results of both into a tuple.
 *
 * @tsplus static Eval/Aspects zip
 */
export const zip = Pipeable(zip_);
