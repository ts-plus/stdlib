/**
 * Sets the specified key to the specified value using the internal hashing
 * function.
 *
 * @tsplus fluent HashMap set
 */
export function set_<K, V>(self: HashMap<K, V>, key: K, value: V): HashMap<K, V> {
  return self.modify(key, () => Option.some(value))
}

/**
 * Sets the specified key to the specified value using the internal hashing
 * function.
 *
 * @tsplus static HashMap/Aspects set
 */
export const set = Pipeable(set_)
