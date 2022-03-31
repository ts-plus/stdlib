/**
 * Updates the value of the specified key within the `HashMap` if it exists.
 *
 * @tsplus fluent HashMap update
 */
export function update_<K, V>(
  self: HashMap<K, V>,
  key: K,
  f: (v: V) => V
): HashMap<K, V> {
  return self.modify(key, (option) => option.map(f));
}

/**
 * Updates the value of the specified key within the `HashMap` if it exists.
 *
 * @tsplus static HashMap/Aspects update
 */
export const update = Pipeable(update_);
