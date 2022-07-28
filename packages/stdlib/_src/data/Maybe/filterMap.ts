/**
 * @tsplus static Maybe.Aspects filterMap
 * @tsplus pipeable Maybe filterMap
 */
export function filterMap<A, B>(f: (a: A) => Maybe<B>) {
  return (self: Maybe<A>): Maybe<B> => self.isNone() ? Maybe.none : f(self.value)
}
