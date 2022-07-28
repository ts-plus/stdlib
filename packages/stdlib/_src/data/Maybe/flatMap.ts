/**
 * Builds a new maybe constructed using the value of self.
 *
 * @tsplus static Maybe.Aspects flatMap
 * @tsplus pipeable Maybe flatMap
 */
export function flatMap<A, B>(f: (a: A) => Maybe<B>) {
  return (self: Maybe<A>): Maybe<B> => self.isNone() ? Maybe.none : f(self.value)
}
