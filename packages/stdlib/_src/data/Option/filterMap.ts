/**
 * @tsplus fluent Option filterMap
 */
export function filterMap_<A, B>(self: Option<A>, f: (a: A) => Option<B>): Option<B> {
  return self.isNone() ? Option.none : f(self.value)
}

/**
 * @tsplus static Option/Aspects filterMap
 */
export const filterMap = Pipeable(filterMap_)
