/**
 * @tsplus static Map.Ops empty
 */
export function empty<K = never, V = never>(): Map<K, V> {
  return new Map<K, V>()
}
