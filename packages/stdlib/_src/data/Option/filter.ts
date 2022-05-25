/**
 * @tsplus fluent Option filter
 */
export function filter_<A, B extends A>(self: Option<A>, f: Refinement<A, B>): Option<B>
export function filter_<A>(self: Option<A>, f: Predicate<A>): Option<A>
export function filter_<A>(self: Option<A>, f: Predicate<A>): Option<A> {
  return self.isNone() ? Option.none : f(self.value) ? self : Option.none
}

/**
 * @tsplus static Option/Aspects filter
 */
export function filter<A, B extends A>(f: Refinement<A, B>): (self: Option<A>) => Option<B>
export function filter<A>(f: Predicate<A>): (self: Option<A>) => Option<A>
export function filter<A>(f: Predicate<A>) {
  return (self: Option<A>): Option<A> => self.filter(f)
}
