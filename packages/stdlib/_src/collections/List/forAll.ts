/**
 * Determines whether a predicate is satisfied for all elements of this List.
 *
 * @tsplus fluent List forAll
 */
export function forAll_<A>(self: List<A>, f: Predicate<A>): boolean {
  for (const a of self) {
    if (!f(a)) {
      return false
    }
  }
  return true
}

/**
 * Determines whether a predicate is satisfied for all elements of this List.
 *
 * @tsplus static List/Ops forAll
 */
export const forAll = Pipeable(forAll_)
