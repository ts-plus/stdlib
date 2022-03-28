/**
 * @tsplus fluent List find
 */
export function find_<A>(self: List<A>, p: Predicate<A>): Option<A> {
  let these = self;
  while (!these.isNil()) {
    if (p(these.head)) {
      return Option.some(these.head);
    }
    these = these.tail;
  }
  return Option.none;
}

export const find = Pipeable(find_);
