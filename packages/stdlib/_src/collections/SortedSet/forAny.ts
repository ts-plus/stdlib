/**
 * Return `true` if one or more elements match the specified predicate,
 * otherwise returns `false`.
 *
 * @tsplus static SortedSet.Aspects forAny
 * @tsplus pipeable SortedSet forAny
 */
export function forAny<A>(f: Predicate<A>) {
  return (self: SortedSet<A>): boolean => {
    let found = false
    for (const value of self) {
      found = f(value)
      if (found) {
        break
      }
    }
    return found
  }
}
