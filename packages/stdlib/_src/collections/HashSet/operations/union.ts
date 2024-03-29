/**
 * Computes the set union `(`self` + `that`)` between this `HashSet` and the
 * specified `Iterable<A>`.
 *
 * **NOTE**: the hash and equal of the values in both the set and the iterable
 * must be the same.
 *
 * @tsplus static HashSet.Aspects union
 * @tsplus pipeable HashSet union
 */
export function union<A>(that: Iterable<A>) {
  return (self: HashSet<A>): HashSet<A> => {
    const set = HashSet.empty<A>()
    return set.mutate((_) => {
      self.forEach((a) => {
        _.add(a)
      })
      for (const a of that) {
        _.add(a)
      }
    })
  }
}
