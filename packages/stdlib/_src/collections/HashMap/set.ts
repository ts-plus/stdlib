/**
 * Sets the specified key to the specified value using the internal hashing
 * function.
 *
 * @tsplus static HashMap.Aspects set
 * @tsplus pipeable HashMap set
 */
export function set<K, V>(key: K, value: V) {
  return (self: HashMap<K, V>): HashMap<K, V> => self.modify(key, () => Maybe.some(value))
}
