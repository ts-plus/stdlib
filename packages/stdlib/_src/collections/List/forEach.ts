/**
 * @tsplus fluent List forEach
 */
export function forEach_<A, U>(self: List<A>, f: (a: A) => U): void {
  let these = self;
  while (!these.isNil()) {
    f(these.head);
    these = these.tail;
  }
}

export const forEach = Pipeable(forEach_);
