/**
 * Apply `Maybe<A> => B` in case self is some returning `Maybe<B>`.
 *
 * @tsplus static Maybe.Aspects extend
 * @tsplus pipeable Maybe extend
 */
export function extend<A, B>(f: (fa: Maybe<A>) => B) {
  return (self: Maybe<A>): Maybe<B> => self.isNone() ? Maybe.none : Maybe.some(f(self))
}
