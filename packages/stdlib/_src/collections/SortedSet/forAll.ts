/**
 * Returns `true` if all elements match the specified predicate, otherwise
 * returns `false`.
 *
 * @tsplus static SortedSet.Aspects forAll
 * @tsplus pipeable SortedSet forAll
 */
export function forAll<A>(f: Predicate<A>) {
  return (self: SortedSet<A>): boolean => !self.forAny((a) => !f(a))
}
