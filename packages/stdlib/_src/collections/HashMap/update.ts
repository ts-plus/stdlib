/**
 * Updates the value of the specified key within the `HashMap` if it exists.
 *
 * @tsplus static HashMap.Aspects update
 * @tsplus pipeable HashMap update
 */
export function update<K, V>(key: K, f: (v: V) => V) {
  return (self: HashMap<K, V>): HashMap<K, V> => self.modify(key, (maybe) => maybe.map(f))
}
