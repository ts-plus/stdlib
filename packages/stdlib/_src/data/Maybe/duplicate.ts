/**
 * Wraps this maybe into a second one.
 *
 * @tsplus getter Maybe duplicate
 * @tsplus static Maybe/Aspects duplicate
 */
export function duplicate<A>(ma: Maybe<A>): Maybe<Maybe<A>> {
  return ma.isNone() ? Maybe.none : Maybe.some(ma)
}
