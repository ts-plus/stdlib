/**
 * Use `A => B` to transform `Maybe<A>` to `Maybe<B>`.
 *
 * @tsplus static Maybe.Aspects map
 * @tsplus pipeable Maybe map
 */
export function map<A, B>(f: (a: A) => B) {
  return (self: Maybe<A>): Maybe<B> => self.isNone() ? Maybe.none : Maybe.some(f(self.value))
}
