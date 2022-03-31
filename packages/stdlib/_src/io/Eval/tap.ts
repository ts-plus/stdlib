/**
 * Returns a computation that effectfully "peeks" at the success of this one.
 *
 * @tsplus fluent Eval tap
 */
export function tap_<A>(self: Eval<A>, f: (a: A) => Eval<any>): Eval<A> {
  return self.flatMap((a) => f(a).map(() => a));
}

/**
 * Returns a computation that effectfully "peeks" at the success of this one.
 *
 * @tsplus static Eval/Aspects tap
 */
export const tap = Pipeable(tap_);
