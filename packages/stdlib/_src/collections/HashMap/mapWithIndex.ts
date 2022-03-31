/**
 * Maps over the entries of the `HashMap` using the specified function.
 *
 * @tsplus fluent HashMap mapWithIndex
 */
export function mapWithIndex_<K, V, A>(
  self: HashMap<K, V>,
  f: (k: K, v: V) => A
): HashMap<K, A> {
  return self.reduceWithIndex(HashMap.empty<K, A>(), (z, k, v) => z.set(k, f(k, v)));
}

/**
 * Maps over the entries of the `HashMap` using the specified function.
 *
 * @tsplus static HashMap/Aspects mapWithIndex
 */
export const mapWithIndex = Pipeable(mapWithIndex_);
