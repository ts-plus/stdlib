/**
 * Remove the entry for the specified key in the `HashMap` using the internal
 * hashing function.
 *
 * @tsplus static HashMap.Aspects remove
 * @tsplus pipeable HashMap remove
 */
export function remove<K>(key: K) {
  return <V>(self: HashMap<K, V>): HashMap<K, V> => self.modify(key, () => Maybe.none)
}
