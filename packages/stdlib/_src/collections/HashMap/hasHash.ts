/**
 * Checks if the specified key has an entry in the `HashMap` using a custom
 * hash.
 *
 * @tsplus fluent HashMap hasHash
 */
export function hasHash_<K, V>(self: HashMap<K, V>, key: K, hash: number): boolean {
  return self.getHash(key, hash).isSome()
}

/**
 * Checks if the specified key has an entry in the `HashMap` using a custom
 * hash.
 *
 * @tsplus static HashMap/Aspects hasHash
 */
export const hasHash = Pipeable(hasHash_)
