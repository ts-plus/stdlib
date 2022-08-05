/**
 * Chains over the values of the `HashMap` using the specified function.
 *
 * **NOTE**: the hash and equal of both maps have to be the same.
 *
 * @tsplus static HashMap.Aspects flatMap
 * @tsplus pipeable HashMap flatMap
 */
export function flatMap<K, V, A>(f: (v: V) => HashMap<K, A>) {
  return (self: HashMap<K, V>): HashMap<K, A> =>
    self.reduceWithIndex(HashMap.empty<K, A>(), (z, _, v) =>
      z.mutate((m) => {
        f(v).forEachWithIndex((_k, _a) => {
          m.set(_k, _a)
        })
      }))
}
