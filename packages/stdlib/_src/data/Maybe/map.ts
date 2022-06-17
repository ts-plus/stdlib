/**
 * Use `A => B` to transform `Maybe<A>` to `Maybe<B>`.
 *
 * @tsplus fluent Maybe map
 */
export function map_<A, B>(self: Maybe<A>, f: (a: A) => B): Maybe<B> {
  return self.isNone() ? Maybe.none : Maybe.some(f(self.value))
}

/**
 * @tsplus static Maybe/Aspects map
 */
export const map = Pipeable(map_)
