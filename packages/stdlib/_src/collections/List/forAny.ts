/**
 * Determines whether a predicate is satisfied for all elements of this List.
 *
 * @tsplus fluent List forAny
 */
export function forAny_<A>(self: List<A>, f: Predicate<A>): boolean {
  for (const a of self) {
    if (f(a)) {
      return true
    }
  }
  return false
}

/**
 * Determines whether a predicate is satisfied for all elements of this List.
 *
 * @tsplus static List/Ops forAny
 */
export const forAny = Pipeable(forAny_)
