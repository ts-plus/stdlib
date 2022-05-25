/**
 * Returns `true` if any value in the `HashSet` matches the specified predicate.
 *
 * @tsplus fluent HashSet some
 */
export function some_<A>(self: HashSet<A>, f: Predicate<A>): boolean {
  let found = false
  for (const v of self) {
    found = f(v)
    if (found) {
      break
    }
  }
  return found
}

/**
 * Returns `true` if any value in the `HashSet` matches the specified predicate.
 *
 * @tsplus static HashSet/Aspects some
 */
export const some = Pipeable(some_)
