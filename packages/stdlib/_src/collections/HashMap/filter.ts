/**
 * Filters entries out of a `HashMap` using the specified predicate.
 *
 * @tsplus fluent HashMap filter
 */
export function filter_<K, A, B extends A>(
  self: HashMap<K, A>,
  f: Refinement<A, B>
): HashMap<K, B>;
export function filter_<K, A>(self: HashMap<K, A>, f: Predicate<A>): HashMap<K, A>;
export function filter_<K, A>(self: HashMap<K, A>, f: Predicate<A>): HashMap<K, A> {
  return self.filterWithIndex((_, a) => f(a));
}

/**
 * Filter out by predicate
 *
 * @tsplus static HashMap/Aspects filter
 */
export function filter<A, B extends A>(
  f: Refinement<A, B>
): <K>(fa: HashMap<K, A>) => HashMap<K, A>;
export function filter<A>(f: Predicate<A>): <K>(fa: HashMap<K, A>) => HashMap<K, A>;
export function filter<A>(f: Predicate<A>) {
  return <K>(self: HashMap<K, A>): HashMap<K, A> => self.filter(f);
}
