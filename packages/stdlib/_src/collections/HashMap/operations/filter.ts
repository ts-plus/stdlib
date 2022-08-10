/**
 * Filters entries out of a `HashMap` using the specified predicate.
 *
 * @tsplus static HashMap.Aspects filter
 * @tsplus pipeable HashMap filter
 */
export function filter<A, B extends A>(
  f: Refinement<A, B>
): <K>(self: HashMap<K, A>) => HashMap<K, B>
export function filter<A>(f: Predicate<A>): <K>(self: HashMap<K, A>) => HashMap<K, A>
export function filter<A>(f: Predicate<A>) {
  return <K>(self: HashMap<K, A>): HashMap<K, A> => self.filterWithIndex((_, a) => f(a))
}
