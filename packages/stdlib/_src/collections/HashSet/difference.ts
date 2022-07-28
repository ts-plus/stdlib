/**
 * Computes the set difference between this `HashSet` and the specified
 * `Iterable<A>`.
 *
 * **NOTE**: the hash and equal of the values in both the set and the iterable
 * must be the same.
 *
 * @tsplus static HashSet.Aspects difference
 * @tsplus pipeable HashSet difference
 */
export function difference<A>(that: Iterable<A>) {
  return (self: HashSet<A>): HashSet<A> =>
    self.mutate((s) => {
      for (const k of that) {
        s.remove(k)
      }
    })
}
