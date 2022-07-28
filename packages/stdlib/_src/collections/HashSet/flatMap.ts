/**
 * Chains over the values of the `HashSet` using the specified function.
 *
 * @tsplus static HashSet.Aspects flatMap
 * @tsplus pipeable HashSet flatMap
 */
export function flatMap<A, B>(f: (a: A) => Collection<B>) {
  return (self: HashSet<A>): HashSet<B> => {
    const set = HashSet.empty<B>()
    return set.mutate((_) => {
      self.forEach((a) => {
        for (const b of f(a)) {
          if (!_.has(b)) {
            _.add(b)
          }
        }
      })
    })
  }
}
