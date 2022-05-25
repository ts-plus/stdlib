/**
 * Builds a new option constructed using the value of self.
 *
 * @tsplus fluent Option flatMap
 */
export function flatMap_<A, B>(self: Option<A>, f: (a: A) => Option<B>): Option<B> {
  return self.isNone() ? Option.none : f(self.value)
}

/**
 * @tsplus static Option/Aspects flatMap
 */
export const flatMap = Pipeable(flatMap_)
