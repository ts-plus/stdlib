/**
 * Safely lookup the value for the specified key in the `HashMap` using the
 * internal hashing function.
 *
 * @tsplus pipeable-index HashMap
 * @tsplus static HashMap.Aspects get
 * @tsplus pipeable HashMap get
 */
export function get<K, V>(key: K) {
  return (self: HashMap<K, V>): Maybe<V> => self.getHash(key, Hash.unknown(key))
}
