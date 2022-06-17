/**
 * Builds a new maybe constructed using the value of self.
 *
 * @tsplus fluent Maybe flatMap
 */
export function flatMap_<A, B>(self: Maybe<A>, f: (a: A) => Maybe<B>): Maybe<B> {
  return self.isNone() ? Maybe.none : f(self.value)
}

/**
 * @tsplus static Maybe/Aspects flatMap
 */
export const flatMap = Pipeable(flatMap_)
