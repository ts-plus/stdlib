/**
 * Returns `true` if any value in the `HashSet` matches the specified predicate.
 *
 * @tsplus static HashSet.Aspects some
 * @tsplus pipeable HashSet some
 */
export function some<A>(f: Predicate<A>) {
  return (self: HashSet<A>): boolean => {
    let found = false
    for (const v of self) {
      found = f(v)
      if (found) {
        break
      }
    }
    return found
  }
}
