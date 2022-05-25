/**
 * Maps over the values of the `HashMap` using the specified function.
 *
 * @tsplus fluent HashMap map
 */
export function map_<K, V, A>(self: HashMap<K, V>, f: (v: V) => A): HashMap<K, A> {
  return self.reduceWithIndex(HashMap.empty<K, A>(), (z, k, v) => z.set(k, f(v)))
}

/**
 * Maps over the values of the `HashMap` using the specified function.
 *
 * @tsplus static HashMap/Aspects map
 */
export const map = Pipeable(map_)
