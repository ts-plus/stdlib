/**
 * Wraps this maybe into a second one.
 *
 * @tsplus getter Maybe duplicate
 * @tsplus static Maybe.Aspects duplicate
 */
export function duplicate<A>(self: Maybe<A>): Maybe<Maybe<A>> {
  return self.isNone() ? Maybe.none : Maybe.some(self)
}
