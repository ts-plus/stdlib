/**
 * Filters values out of a `HashSet` using the specified predicate.
 *
 * @tsplus static HashSet.Aspects filter
 * @tsplus pipeable HashSet filter
 */
export function filter<A, B extends A>(f: Refinement<A, B>): (self: HashSet<A>) => HashSet<B>
export function filter<A>(f: Predicate<A>): (self: HashSet<A>) => HashSet<A>
export function filter<A>(f: Predicate<A>) {
  return (self: HashSet<A>): HashSet<A> => {
    const set = HashSet.empty<A>()
    return set.mutate((r) => {
      const vs = self.values
      let e: IteratorResult<A, any>
      while (!(e = vs.next()).done) {
        const value = e.value
        if (f(value)) {
          r.add(value)
        }
      }
    })
  }
}
