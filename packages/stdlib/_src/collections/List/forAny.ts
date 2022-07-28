/**
 * Determines whether a predicate is satisfied for all elements of this List.
 *
 * @tsplus static List.Aspects forAny
 * @tsplus pipeable List forAny
 */
export function forAny<A>(f: Predicate<A>) {
  return (self: List<A>): boolean => {
    for (const a of self) {
      if (f(a)) {
        return true
      }
    }
    return false
  }
}
