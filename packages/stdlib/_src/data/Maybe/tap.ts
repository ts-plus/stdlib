/**
 * Like chain but ignores the constructed outout.
 *
 * @tsplus fluent Maybe tap
 */
export function tap_<A>(ma: Maybe<A>, f: (a: A) => Maybe<any>): Maybe<A> {
  return ma.flatMap((a) => f(a).map(() => a))
}

/**
 * @tsplus static Maybe/Aspects tap
 */
export const tap = Pipeable(tap_)
