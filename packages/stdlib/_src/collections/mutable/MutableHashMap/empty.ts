/**
 * Creates a new empty `MutableHashMap`.
 *
 * @tsplus static MutableHashMap/Ops empty
 */
export function empty<K, V>() {
  return new MutableHashMap<K, V>();
}
