/**
 * Computes the set difference between this `HashSet` and the specified
 * `Iterable<A>`.
 *
 * **NOTE**: the hash and equal of the values in both the set and the iterable
 * must be the same.
 *
 * @tsplus fluent HashSet difference
 */
export function difference_<A>(self: HashSet<A>, that: Iterable<A>): HashSet<A> {
  return self.mutate((s) => {
    for (const k of that) {
      s.remove(k);
    }
  });
}

/**
 * Computes the set difference between this `HashSet` and the specified
 * `Iterable<A>`.
 *
 * **NOTE**: the hash and equal of the values in both the set and the iterable
 * must be the same.
 *
 * @tsplus static HashSet/Aspects difference
 */
export const difference = Pipeable(difference_);
