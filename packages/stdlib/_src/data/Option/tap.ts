/**
 * Like chain but ignores the constructed outout.
 *
 * @tsplus fluent Option tap
 */
export function tap_<A>(ma: Option<A>, f: (a: A) => Option<any>): Option<A> {
  return ma.flatMap((a) => f(a).map(() => a));
}

/**
 * @tsplus static Option/Aspects tap
 */
export const tap = Pipeable(tap_);
