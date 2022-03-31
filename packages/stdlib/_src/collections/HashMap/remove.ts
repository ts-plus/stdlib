/**
 * Remove the entry for the specified key in the `HashMap` using the internal
 * hashing function.
 *
 * @tsplus fluent HashMap remove
 */
export function remove_<K, V>(self: HashMap<K, V>, key: K) {
  return self.modify(key, () => Option.none);
}

/**
 * Remove the entry for the specified key in the `HashMap` using the internal
 * hashing function.
 *
 * @tsplus static HashMap/Aspects remove
 */
export const remove = Pipeable(remove_);
