/**
 * Apply both and return first.
 *
 * @tsplus operator Maybe <
 * @tsplus fluent Maybe zipLeft
 */
export function zipLeft_<A, B>(fa: Maybe<A>, fb: Maybe<B>): Maybe<A> {
  return fa.map((a) => () => a).ap(fb)
}

/**
 * @tsplus static Maybe/Aspects zipLeft
 */
export const zipLeft = Pipeable(zipLeft_)
