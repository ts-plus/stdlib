/**
 * Returns a `HashSet` of values which are present in both this set and that
 * `Iterable<A>`.
 *
 * **NOTE**: the hash and equal of the values in both the set and the iterable
 * must be the same.
 *
 * @tsplus static HashSet.Aspects intersection
 * @tsplus pipeable HashSet intersection
 */
export function intersection<A>(that: Iterable<A>) {
  return (self: HashSet<A>): HashSet<A> => {
    const set = HashSet.empty<A>()
    return set.mutate((_) => {
      for (const k of that) {
        if (self.has(k)) {
          _.add(k)
        }
      }
    })
  }
}
