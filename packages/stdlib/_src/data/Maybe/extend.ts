/**
 * Apply `Maybe<A> => B` in case self is some returning `Maybe<B>`.
 *
 * @tsplus fluent Maybe extend
 */
export function extend_<A, B>(self: Maybe<A>, f: (fa: Maybe<A>) => B): Maybe<B> {
  return self.isNone() ? Maybe.none : Maybe.some(f(self))
}

/**
 * @tsplus static Maybe/Aspects extend
 */
export const extend = Pipeable(extend_)
