/**
 * @tsplus fluent List find
 */
export function find_<A>(self: List<A>, p: Predicate<A>): Maybe<A> {
  let these = self
  while (!these.isNil()) {
    if (p(these.head)) {
      return Maybe.some(these.head)
    }
    these = these.tail
  }
  return Maybe.none
}

export const find = Pipeable(find_)
