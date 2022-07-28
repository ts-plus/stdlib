/**
 * Maps over the values of the `HashMap` using the specified function.
 *
 * @tsplus static HashMap.Aspects map
 * @tsplus pipeable HashMap map
 */
export function map<V, A>(f: (v: V) => A) {
  return <K>(self: HashMap<K, V>): HashMap<K, A> =>
    self.reduceWithIndex(HashMap.empty<K, A>(), (z, k, v) => z.set(k, f(v)))
}
