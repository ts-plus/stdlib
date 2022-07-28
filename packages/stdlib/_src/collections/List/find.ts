/**
 * @tsplus static List.Aspects find
 * @tsplus pipeable List find
 */
export function find<A, B extends A>(p: Refinement<A, B>): (self: List<A>) => Maybe<B>
export function find<A>(p: Predicate<A>): (self: List<A>) => Maybe<A>
export function find<A>(p: Predicate<A>) {
  return (self: List<A>): Maybe<A> => {
    let these = self
    while (!these.isNil()) {
      if (p(these.head)) {
        return Maybe.some(these.head)
      }
      these = these.tail
    }
    return Maybe.none
  }
}
