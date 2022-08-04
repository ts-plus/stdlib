/**
 * Creates a new empty `MutableHashMap`.
 *
 * @tsplus static MutableHashMap.Ops empty
 */
export function empty<K = never, V = never>() {
  return new MutableHashMap<K, V>()
}
