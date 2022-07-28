/**
 * Maps over the entries of the `HashMap` using the specified function.
 *
 * @tsplus static HashMap.Aspects mapWithIndex
 * @tsplus pipeable HashMap mapWithIndex
 */
export function mapWithIndex<K, V, A>(f: (k: K, v: V) => A) {
  return (self: HashMap<K, V>): HashMap<K, A> =>
    self.reduceWithIndex(HashMap.empty<K, A>(), (z, k, v) => z.set(k, f(k, v)))
}
