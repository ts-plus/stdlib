/**
 * Maps over the values of the `HashSet` using the specified function.
 *
 * @tsplus static HashSet.Aspects map
 * @tsplus pipeable HashSet map
 */
export function map<A, B>(f: (a: A) => B) {
  return (self: HashSet<A>): HashSet<B> => {
    const set = HashSet.empty<B>()
    return set.mutate((_) => {
      self.forEach((e) => {
        const v = f(e)
        if (!_.has(v)) {
          _.add(v)
        }
      })
    })
  }
}
