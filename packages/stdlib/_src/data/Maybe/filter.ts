/**
 * @tsplus static Maybe.Aspects filter
 * @tsplus pipeable Maybe filter
 */
export function filter<A, B extends A>(f: Refinement<A, B>): (self: Maybe<A>) => Maybe<B>
export function filter<A>(f: Predicate<A>): (self: Maybe<A>) => Maybe<A>
export function filter<A>(f: Predicate<A>) {
  return (self: Maybe<A>): Maybe<A> =>
    self.isNone() ? Maybe.none : f(self.value) ? self : Maybe.none
}
