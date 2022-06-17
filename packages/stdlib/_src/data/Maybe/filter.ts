/**
 * @tsplus fluent Maybe filter
 */
export function filter_<A, B extends A>(self: Maybe<A>, f: Refinement<A, B>): Maybe<B>
export function filter_<A>(self: Maybe<A>, f: Predicate<A>): Maybe<A>
export function filter_<A>(self: Maybe<A>, f: Predicate<A>): Maybe<A> {
  return self.isNone() ? Maybe.none : f(self.value) ? self : Maybe.none
}

/**
 * @tsplus static Maybe/Aspects filter
 */
export function filter<A, B extends A>(f: Refinement<A, B>): (self: Maybe<A>) => Maybe<B>
export function filter<A>(f: Predicate<A>): (self: Maybe<A>) => Maybe<A>
export function filter<A>(f: Predicate<A>) {
  return (self: Maybe<A>): Maybe<A> => self.filter(f)
}
