/**
 * Maps over the values of the `HashSet` using the specified function.
 *
 * @tsplus fluent HashSet map
 */
export function map_<A, B>(self: HashSet<A>, f: (a: A) => B): HashSet<B> {
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

/**
 * Maps over the values of the `HashSet` using the specified function.
 *
 * @tsplus static HashSet/Aspects map
 */
export const map = Pipeable(map_)
