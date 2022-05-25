/**
 * Apply `Option<A> => B` in case self is some returning `Option<B>`.
 *
 * @tsplus fluent Option extend
 */
export function extend_<A, B>(self: Option<A>, f: (fa: Option<A>) => B): Option<B> {
  return self.isNone() ? Option.none : Option.some(f(self))
}

/**
 * @tsplus static Option/Aspects extend
 */
export const extend = Pipeable(extend_)
