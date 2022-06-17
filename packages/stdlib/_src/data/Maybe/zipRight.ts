/**
 * Apply both and return second.
 *
 * @tsplus operator Maybe >
 * @tsplus fluent Maybe zipRight
 */
export function zipRight_<A, B>(fa: Maybe<A>, fb: Maybe<B>): Maybe<B> {
  return fa.map(() => (b: B) => b).ap(fb)
}

/**
 * @tsplus static Maybe/Aspects zipRight
 */
export const zipRight = Pipeable(zipRight_)
