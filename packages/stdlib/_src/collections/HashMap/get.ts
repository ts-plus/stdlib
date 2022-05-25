/**
 * Safely lookup the value for the specified key in the `HashMap` using the
 * internal hashing function.
 *
 * @tsplus fluent HashMap get
 * @tsplus index HashMap
 */
export function get_<K, V>(self: HashMap<K, V>, key: K): Option<V> {
  return self.getHash(key, Hash.unknown(key))
}

/**
 * Safely lookup the value for the specified key in the `HashMap` using the
 * internal hashing function.
 *
 * @tsplus static HashMap/Aspects get
 */
export const get = Pipeable(get_)
