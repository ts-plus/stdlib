/**
 * Checks if the specified key has an entry in the `HashMap`.
 *
 * @tsplus fluent HashMap has
 */
export function has_<K, V>(self: HashMap<K, V>, key: K): boolean {
  return self.getHash(key, Hash.unknown(key)).isSome();
}

/**
 * Checks if the specified key has an entry in the `HashMap`.
 *
 * @tsplus static HashMap/Aspects has
 */
export const has = Pipeable(has_);
