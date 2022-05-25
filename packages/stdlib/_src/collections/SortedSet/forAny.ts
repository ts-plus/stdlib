/**
 * Return `true` if one or more elements match the specified predicate,
 * otherwise returns `false`.
 *
 * @tsplus fluent SortedSet forAny
 */
export function forAny_<A>(self: SortedSet<A>, f: Predicate<A>): boolean {
  let found = false
  for (const value of self) {
    found = f(value)
    if (found) {
      break
    }
  }
  return found
}

/**
 * Return `true` if one or more elements match the specified predicate,
 * otherwise returns `false`.
 *
 * @tsplus static SortedSet/Aspects forAny
 */
export const forAny = Pipeable(forAny_)
