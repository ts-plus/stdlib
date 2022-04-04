/**
 * Returns `true` if all elements match the specified predicate, otherwise
 * returns `false`.
 *
 * @tsplus fluent SortedSet forAll
 */
export function forAll_<A>(self: SortedSet<A>, f: Predicate<A>): boolean {
  return !self.forAny((a) => !f(a));
}

/**
 * Returns `true` if all elements match the specified predicate, otherwise
 * returns `false`.
 *
 * @tsplus static SortedSet/Aspects forAll
 */
export const forAll = Pipeable(forAll_);
