/**
 * @tsplus fluent Maybe filterMap
 */
export function filterMap_<A, B>(self: Maybe<A>, f: (a: A) => Maybe<B>): Maybe<B> {
  return self.isNone() ? Maybe.none : f(self.value)
}

/**
 * @tsplus static Maybe/Aspects filterMap
 */
export const filterMap = Pipeable(filterMap_)
