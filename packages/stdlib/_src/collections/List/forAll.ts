/**
 * Determines whether a predicate is satisfied for all elements of this List.
 *
 * @tsplus static List.Aspects forAll
 * @tsplus pipeable List forAll
 */
export function forAll<A>(f: Predicate<A>) {
  return (self: List<A>): boolean => {
    for (const a of self) {
      if (!f(a)) {
        return false
      }
    }
    return true
  }
}
