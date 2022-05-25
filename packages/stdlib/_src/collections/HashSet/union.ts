/**
 * Computes the set union `(`self` + `that`)` between this `HashSet` and the
 * specified `Iterable<A>`.
 *
 * **NOTE**: the hash and equal of the values in both the set and the iterable
 * must be the same.
 *
 * @tsplus fluent HashSet union
 */
export function union_<A>(self: HashSet<A>, that: Iterable<A>): HashSet<A> {
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

/**
 * Computes the set union `(`self` + `that`)` between this `HashSet` and the
 * specified `Iterable<A>`.
 *
 * **NOTE**: the hash and equal of the values in both the set and the iterable
 * must be the same.
 *
 * @tsplus static HashSet/Aspects union
 */
export const union = Pipeable(union_)
